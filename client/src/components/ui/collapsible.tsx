import * as React from "react"
import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible"

function Collapsible({ ...props }: CollapsiblePrimitive.Root.Props) {
  return <CollapsiblePrimitive.Root data-slot="collapsible" {...props} />
}

// forwardRef so this survives being nested inside another component's `render` slot (e.g.
// `TooltipTrigger render={<CollapsibleTrigger />}`) — see the matching note on ui/input.tsx.
const CollapsibleTrigger = React.forwardRef<HTMLButtonElement, CollapsiblePrimitive.Trigger.Props>(
  ({ ...props }, ref) => (
    <CollapsiblePrimitive.Trigger ref={ref} data-slot="collapsible-trigger" {...props} />
  )
)
CollapsibleTrigger.displayName = "CollapsibleTrigger"

function CollapsibleContent({ ...props }: CollapsiblePrimitive.Panel.Props) {
  return (
    <CollapsiblePrimitive.Panel data-slot="collapsible-content" {...props} />
  )
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
