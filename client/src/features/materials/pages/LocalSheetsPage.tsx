import { MaterialReceiptPage } from "../components/MaterialReceiptPage";

export function LocalSheetsPage() {
  return (
    <MaterialReceiptPage
      config={{
        kind: "local-sheets",
        title: "Local Sheets",
        description: "Local sheet receipts. Total Weight = Packet Quantity × Packet Weight.",
        entityName: "Local Sheet",
        fields: [
          { name: "date", label: "Date *", type: "date" },
          { name: "materialCode", label: "Material Code *", type: "text", placeholder: "e.g. 20 x 30" },
          { name: "packetQuantity", label: "Packet Quantity *", type: "number" },
          { name: "packetWeight", label: "Packet Weight *", type: "number" },
        ],
        multiplicands: ["packetQuantity", "packetWeight"],
      }}
    />
  );
}
