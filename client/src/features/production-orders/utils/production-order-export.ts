import * as XLSX from "xlsx";
import { formatDate, formatNumber } from "@/lib/format";
import type { ProductionOrderOverview } from "../types";

/**
 * Generates and downloads a multi-sheet Excel file (.xlsx) for a Production Order.
 */
export function exportProductionOrderToExcel(overview: ProductionOrderOverview) {
  const { productionOrder: order, lines, totals } = overview;
  const workbook = XLSX.utils.book_new();

  // 1. Order Summary Sheet
  const summaryData = [
    { Field: "Production Order #", Value: order.productionNumber },
    { Field: "Sales Order (SO #)", Value: order.soNumber },
    { Field: "PO Number", Value: order.poNumber ?? "—" },
    { Field: "Company / Customer", Value: order.companyName ?? order.customer ?? "—" },
    { Field: "Brand", Value: order.brandName ?? "—" },
    { Field: "Product Type", Value: (order.productType ?? "printed").toUpperCase() },
    { Field: "Status", Value: order.status.toUpperCase() },
    { Field: "Total Order Qty", Value: Number(order.totalQty || 0) },
    { Field: "Planned Qty", Value: Number(totals.plannedQty || 0) },
    { Field: "Unplanned Qty", Value: Number(totals.unplannedQty || 0) },
    { Field: "Total Rolls Planned", Value: Number(totals.totalRolls || 0) },
    { Field: "Total Weight (kg)", Value: Number(totals.totalWeight || 0) },
    { Field: "Overall Completion", Value: `${totals.completionPct}%` },
    { Field: "Order Date", Value: formatDate(order.orderDate) },
    { Field: "Due Date", Value: formatDate(order.dueDate) },
    { Field: "Notes", Value: order.notes ?? "—" },
  ];

  const summarySheet = XLSX.utils.json_to_sheet(summaryData);
  summarySheet["!cols"] = [{ wch: 25 }, { wch: 40 }];
  XLSX.utils.book_append_sheet(workbook, summarySheet, "Order Summary");

  // 2. Label Types & Progress Breakdown Sheet
  if (lines.length > 0) {
    const linesData = lines.map((l) => ({
      "Line ID": l.id,
      "Label Type": l.labelType,
      "Status": l.status,
      "Planned Quantity": Number(l.planning.quantity || 0),
      "Label Size (mm)": Number(l.planning.labelSize || 0),
      "Roll Length (m)": Number(l.planning.rollLength || 200),
      "Required Rolls": Number(l.planning.requiredRolls || 0),
      "Extra Rolls": Number(l.planning.extraRolls || 0),
      "Total Rolls": Number(l.planning.totalRolls || 0),
      "Total Weight (kg)": l.planning.totalWeight != null ? Number(l.planning.totalWeight) : "",
      "Material Code": l.material.materialCode ?? "—",
      "Material Description": l.material.description ?? "—",
      "Assigned Rolls": Number(l.material.assignedRolls || 0),
      "Assigned Weight (kg)": Number(l.material.assignedWeight || 0),
      "Printing Machine": l.printing.machineName ?? "Unassigned",
      "Printing Operator": l.printing.operatorName ?? "Unassigned",
      "Printed Rolls": Number(l.printing.printedRolls || 0),
      "Cutting Machine": l.cutting.machineName ?? "Unassigned",
      "Cutting Operator": l.cutting.operatorName ?? "Unassigned",
      "Cut Rolls": Number(l.cutting.cutRolls || 0),
      "Packaging Operator": l.packaging.operatorName ?? "Unassigned",
      "Packaged Rolls": Number(l.packaging.packagedRolls || 0),
      "Packaged Qty (pcs)": Number(l.packaging.packagedQty || 0),
      "Completion %": `${l.liveProgress?.completionPct ?? 0}%`,
    }));

    const linesSheet = XLSX.utils.json_to_sheet(linesData);
    XLSX.utils.book_append_sheet(workbook, linesSheet, "Label Types Progress");
  }

  // Save Excel file
  const filename = `${order.productionNumber}_${order.soNumber}.xlsx`;
  XLSX.writeFile(workbook, filename);
}

/**
 * Triggers the browser print dialog formatted as a clean Production Job Ticket.
 */
export function printProductionOrderJobTicket(overview: ProductionOrderOverview) {
  let printArea = document.getElementById("print-area");
  if (!printArea) {
    printArea = document.createElement("div");
    printArea.id = "print-area";
    printArea.className = "hidden print:block";
    document.body.appendChild(printArea);
  }

  const { productionOrder: order, lines, totals } = overview;

  const html = `
    <div style="font-family: Arial, sans-serif; padding: 20px; color: #111;">
      <div style="display: flex; justify-content: space-between; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 15px;">
        <div>
          <h1 style="margin: 0; font-size: 22px; font-weight: bold;">3Q FACILITY — PRODUCTION JOB TICKET</h1>
          <p style="margin: 4px 0 0; font-size: 13px; color: #555;">Production Run & Material Allocation Summary</p>
        </div>
        <div style="text-align: right;">
          <h2 style="margin: 0; font-size: 20px; font-family: monospace;">${order.productionNumber}</h2>
          <p style="margin: 4px 0 0; font-size: 12px; color: #555;">Sales Order: <strong>${order.soNumber}</strong></p>
        </div>
      </div>

      <!-- Header Information -->
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 12px;">
        <tr>
          <td style="padding: 6px; border: 1px solid #ccc; background: #f9f9f9; width: 18%;"><strong>Company:</strong></td>
          <td style="padding: 6px; border: 1px solid #ccc; width: 32%;">${order.companyName ?? "—"}</td>
          <td style="padding: 6px; border: 1px solid #ccc; background: #f9f9f9; width: 18%;"><strong>Brand:</strong></td>
          <td style="padding: 6px; border: 1px solid #ccc; width: 32%;">${order.brandName ?? "—"}</td>
        </tr>
        <tr>
          <td style="padding: 6px; border: 1px solid #ccc; background: #f9f9f9;"><strong>PO Number:</strong></td>
          <td style="padding: 6px; border: 1px solid #ccc;">${order.poNumber ?? "—"}</td>
          <td style="padding: 6px; border: 1px solid #ccc; background: #f9f9f9;"><strong>Status:</strong></td>
          <td style="padding: 6px; border: 1px solid #ccc; font-weight: bold; text-transform: uppercase;">${order.status}</td>
        </tr>
        <tr>
          <td style="padding: 6px; border: 1px solid #ccc; background: #f9f9f9;"><strong>Total Quantity:</strong></td>
          <td style="padding: 6px; border: 1px solid #ccc;"><strong>${formatNumber(order.totalQty, 0)}</strong> pcs</td>
          <td style="padding: 6px; border: 1px solid #ccc; background: #f9f9f9;"><strong>Product Type:</strong></td>
          <td style="padding: 6px; border: 1px solid #ccc; text-transform: uppercase;">${order.productType ?? "printed"}</td>
        </tr>
        <tr>
          <td style="padding: 6px; border: 1px solid #ccc; background: #f9f9f9;"><strong>Due Date:</strong></td>
          <td style="padding: 6px; border: 1px solid #ccc;">${formatDate(order.dueDate)}</td>
          <td style="padding: 6px; border: 1px solid #ccc; background: #f9f9f9;"><strong>Completion:</strong></td>
          <td style="padding: 6px; border: 1px solid #ccc;"><strong>${totals.completionPct}%</strong> (${formatNumber(totals.packagedRolls, 0)} / ${formatNumber(totals.totalRolls, 0)} rolls)</td>
        </tr>
      </table>

      <!-- Label Types Progress Table -->
      <h3 style="margin: 0 0 8px; font-size: 14px; border-bottom: 1px solid #333; padding-bottom: 4px;">Label Types Breakdown (${lines.length})</h3>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 11px;">
        <thead>
          <tr style="background: #e5e7eb;">
            <th style="border: 1px solid #999; padding: 6px; text-align: left;">Label Type</th>
            <th style="border: 1px solid #999; padding: 6px; text-align: right;">Qty</th>
            <th style="border: 1px solid #999; padding: 6px; text-align: left;">Material</th>
            <th style="border: 1px solid #999; padding: 6px; text-align: right;">Total Rolls</th>
            <th style="border: 1px solid #999; padding: 6px; text-align: left;">Printing Crew</th>
            <th style="border: 1px solid #999; padding: 6px; text-align: left;">Printed</th>
            <th style="border: 1px solid #999; padding: 6px; text-align: left;">Cut</th>
            <th style="border: 1px solid #999; padding: 6px; text-align: left;">Packaged</th>
            <th style="border: 1px solid #999; padding: 6px; text-align: right;">Packaged Qty</th>
          </tr>
        </thead>
        <tbody>
          ${lines
            .map(
              (l) => `
            <tr>
              <td style="border: 1px solid #ccc; padding: 5px; font-weight: bold;">${l.labelType}</td>
              <td style="border: 1px solid #ccc; padding: 5px; text-align: right;">${formatNumber(l.planning.quantity, 0)}</td>
              <td style="border: 1px solid #ccc; padding: 5px;">${l.material.materialCode ?? "—"}</td>
              <td style="border: 1px solid #ccc; padding: 5px; text-align: right;">${formatNumber(l.planning.totalRolls, 0)}</td>
              <td style="border: 1px solid #ccc; padding: 5px;">${l.printing.machineName ?? "—"} (${l.printing.operatorName ?? "—"})</td>
              <td style="border: 1px solid #ccc; padding: 5px;">${formatNumber(l.printing.printedRolls, 0)} rolls</td>
              <td style="border: 1px solid #ccc; padding: 5px;">${formatNumber(l.cutting.cutRolls, 0)} rolls</td>
              <td style="border: 1px solid #ccc; padding: 5px;">${formatNumber(l.packaging.packagedRolls, 0)} rolls</td>
              <td style="border: 1px solid #ccc; padding: 5px; text-align: right;">${formatNumber(l.packaging.packagedQty, 0)}</td>
            </tr>
          `
            )
            .join("")}
        </tbody>
        <tfoot>
          <tr style="background: #f3f4f6; font-weight: bold;">
            <td style="border: 1px solid #999; padding: 6px;">TOTALS</td>
            <td style="border: 1px solid #999; padding: 6px; text-align: right;">${formatNumber(totals.plannedQty, 0)}</td>
            <td style="border: 1px solid #999; padding: 6px;">—</td>
            <td style="border: 1px solid #999; padding: 6px; text-align: right;">${formatNumber(totals.totalRolls, 0)}</td>
            <td style="border: 1px solid #999; padding: 6px;">—</td>
            <td style="border: 1px solid #999; padding: 6px;">${formatNumber(totals.printedRolls, 0)} rolls</td>
            <td style="border: 1px solid #999; padding: 6px;">${formatNumber(totals.cutRolls, 0)} rolls</td>
            <td style="border: 1px solid #999; padding: 6px;">${formatNumber(totals.packagedRolls, 0)} rolls</td>
            <td style="border: 1px solid #999; padding: 6px; text-align: right;">${formatNumber(totals.packagedQty, 0)}</td>
          </tr>
        </tfoot>
      </table>

      ${
        order.notes
          ? `<div style="margin-top: 15px; padding: 10px; border: 1px solid #ccc; background: #fffbe3;">
              <strong>Notes / Special Instructions:</strong><br />
              <p style="margin: 4px 0 0; white-space: pre-wrap;">${order.notes}</p>
            </div>`
          : ""
      }

      <div style="margin-top: 40px; display: flex; justify-content: space-between; font-size: 12px;">
        <div style="width: 40%; border-top: 1px solid #000; padding-top: 4px;">
          Production Manager Signature
        </div>
        <div style="width: 40%; border-top: 1px solid #000; padding-top: 4px; text-align: right;">
          Floor Supervisor Approval & Date
        </div>
      </div>
    </div>
  `;

  printArea.innerHTML = html;
  window.print();
}
