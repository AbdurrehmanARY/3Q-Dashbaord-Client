import { MaterialReceiptPage } from "../components/MaterialReceiptPage";

export function StickerMaterialsPage() {
  return (
    <MaterialReceiptPage
      config={{
        kind: "stickers",
        title: "Sticker Materials",
        description: "Sticker roll receipts. Total Weight = Roll Quantity × Weight Per Roll.",
        entityName: "Sticker Material",
        fields: [
          { name: "invoiceDate", label: "Invoice Date *", type: "date" },
          { name: "stickerSize", label: "Sticker Size *", type: "text", placeholder: 'e.g. 4 x 6' },
          { name: "materialCode", label: "Material Code *", type: "text" },
          { name: "rollQuantity", label: "Roll Quantity *", type: "number" },
          { name: "weightPerRoll", label: "Weight Per Roll *", type: "number" },
        ],
        multiplicands: ["rollQuantity", "weightPerRoll"],
      }}
    />
  );
}
