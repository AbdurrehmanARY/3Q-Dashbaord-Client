import { MaterialReceiptPage } from "../components/MaterialReceiptPage";

export function LabelSheetsPage() {
  return (
    <MaterialReceiptPage
      config={{
        kind: "label-sheets",
        title: "Label Sheets",
        description: "Label sheet receipts. Total Weight = Sheet Quantity × Weight Per Sheet.",
        entityName: "Label Sheet",
        fields: [
          { name: "date", label: "Date *", type: "date" },
          { name: "materialCode", label: "Material Code *", type: "text" },
          { name: "sheetQuantity", label: "Sheet Quantity *", type: "number" },
          { name: "weightPerSheet", label: "Weight Per Sheet *", type: "number" },
        ],
        multiplicands: ["sheetQuantity", "weightPerSheet"],
      }}
    />
  );
}
