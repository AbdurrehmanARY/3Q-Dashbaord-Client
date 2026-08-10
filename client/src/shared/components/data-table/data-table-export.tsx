import * as XLSX from "xlsx";

/**
 * A human-readable export column: a header label and how to pull its value off a row.
 * Reuse the same formatting the table's cell renderers use where practical, so exports
 * carry the same values the user sees — not raw ids/enums.
 */
export interface DataTableExportColumn<TData> {
  header: string;
  value: (row: TData) => string | number | null | undefined;
  /**
   * The table column id this export column mirrors. When set, hiding that column in the
   * "Columns" toggle also drops it from the export/print. Omit for export-only fields that
   * have no matching visible column.
   */
  columnId?: string;
}

function toRecords<TData>(rows: TData[], columns: DataTableExportColumn<TData>[]) {
  return rows.map((row) => {
    const record: Record<string, string | number> = {};
    for (const col of columns) {
      const v = col.value(row);
      record[col.header] = v == null ? "" : v;
    }
    return record;
  });
}

/**
 * Client-side Excel export via SheetJS. Raw values only — for a styled business document
 * (column widths, headers, branding) do it server-side with `exceljs`, not here.
 */
export function exportRowsToExcel<TData>(
  rows: TData[],
  columns: DataTableExportColumn<TData>[],
  filename: string
) {
  const data = columns.length
    ? toRecords(rows, columns)
    : (rows as unknown as Record<string, unknown>[]);
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  XLSX.writeFile(workbook, filename.toLowerCase().endsWith(".xlsx") ? filename : `${filename}.xlsx`);
}

/**
 * A plain, print-only table of the given rows — no checkboxes, no action column, no pinned
 * columns. Rendered into a hidden `#print-area` that the global print CSS reveals.
 */
export function PrintTable<TData>({
  rows,
  columns,
}: {
  rows: TData[];
  columns: DataTableExportColumn<TData>[];
}) {
  return (
    <table>
      <thead>
        <tr>
          {columns.map((c) => (
            <th key={c.header}>{c.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i}>
            {columns.map((c) => {
              const v = c.value(row);
              return <td key={c.header}>{v == null ? "" : String(v)}</td>;
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
