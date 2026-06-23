import { Card } from "../ui/Card";

export function DataTable({ title, rows }: { title: string; rows: Array<Record<string, unknown>> }) {
  const columns = rows[0] ? Object.keys(rows[0]).slice(0, 5) : ["title", "status", "updatedAt"];
  return (
    <Card className="overflow-hidden">
      <div className="border-b border-border p-4">
        <h2 className="font-bold">{title}</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted text-muted-foreground">
            <tr>{columns.map((column) => <th key={column} className="px-4 py-3 font-semibold">{column}</th>)}</tr>
          </thead>
          <tbody>
            {rows.length ? rows.map((row, index) => (
              <tr key={index} className="border-t border-border">
                {columns.map((column) => <td key={column} className="px-4 py-3">{String(row[column] ?? "-")}</td>)}
              </tr>
            )) : (
              <tr><td className="px-4 py-8 text-muted-foreground" colSpan={columns.length}>No records yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
