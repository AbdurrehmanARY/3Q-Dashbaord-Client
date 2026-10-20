# Implementation: Waste Tracking Without Auto-Headroom

## Goal

Waste is tracked and displayed but does NOT automatically create assignment headroom.
Users manually edit the production plan (totalRolls/assignedRolls) to add capacity.
The order completes when produced + wasted >= planned.

## User Workflow (target behavior)

1. Plan = 4 rolls. remainingPlanned = 4 - 0 = 4.
2. Printing P-001: Assign 4, produce 4, waste 0.
3. Cutting C-001: Consume 4, produce 2, waste 2 (mis-cut).
4. After waste: remainingPlanned = 4 - 4 = 0 (waste does NOT add to remaining).
5. User sees: 2 wasted tracked separately. remainingPlanned = 0, cannot assign more.
6. User edits plan: Changes assignedRolls from 4 to 6 via the planning dialog.
7. Printing P-002: Assign 2 more, produce 2, waste 0.
8. Cutting C-002: Consume 2, produce 2, waste 0.
9. Packaging: Consume 4 total, produce 4 packaged rolls.
10. Ready for completion: produced(4) + wasted(2) >= planned(6) -> yes.

## Changes Made

### 1. server/src/modules/production/batch-and-runs/batch-flow.repository.ts

**remainingPlannedTx (line ~854):**
- Removed the SUM(wasted_rolls) SQL sub-select across all stages
- Removed wasted from .select() calls
- Removed const totalWasted variable
- Changed return from planned + totalWasted - totalAssigned to planned - totalAssigned
- Updated comment: waste is tracked but does NOT create headroom

**remainingPlannedSizeTx (line ~892):**
- Same reverts as above for the woven Size Label variant

### 2. server/src/modules/production/batch-and-runs/batch-flow.helpers.ts

**lineFlowOf remainingPlanned (line ~253):**
- Changed from planned + wastedTotal - assignedToFirst to planned - assignedToFirst
- Updated comment: waste does NOT create extra headroom
- wastedTotal field retained for display and completion check

**isReadyForCompletion (line ~330):**
- Added wastedTotal: number to the parameter type
- Changed check from packagedProduced >= planned to packagedProduced + wastedTotal >= planned
- Updated comment: waste counts toward completion but not assignment capacity

### 3. server/src/modules/production/batch-and-runs/batch-flow.service.ts

- Added wastedTotal to the totals aggregation (accumulator + initial value)
- This is needed so perLine passes the correct data to isReadyForCompletion

### 4. server/src/modules/production/batch-and-runs/batch-flow.helpers.test.ts

- Updated existing isReadyForCompletion test calls to include wastedTotal: 0
- Added new test case: counts waste toward completion but not headroom

## No New Migrations Needed

Migration 0027 (waste_reason column, all-stage waste recording) is already applied to live.
No schema changes are needed for these logic changes.

## Test Plan

1. remainingPlannedTx returns planned - assigned (no waste bonus)
2. Waste at cutting does NOT increase remainingPlanned
3. After editing plan (increasing totalRolls), remainingPlanned increases
4. isReadyForCompletion returns true when produced + wasted >= planned
5. isReadyForCompletion returns false when produced + wasted < planned
6. wastedTotal still computed and returned in LineFlow (for display)
7. Typecheck passes in both packages
8. All existing tests pass
