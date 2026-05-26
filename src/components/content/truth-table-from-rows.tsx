import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@src/components/ui/table";
import type { TruthTableRow } from "@src/lib/gates/types";

type TruthTableFromRowsProps = {
  rows: TruthTableRow[];
};

export function TruthTableFromRows({ rows }: TruthTableFromRowsProps) {
  if (rows.length === 0) {
    return null;
  }

  const headers = Object.keys(rows[0]);

  return (
    <div className="rounded-lg border border-border/80 bg-muted/15 p-2">
      <Table>
        <TableHeader>
          <TableRow>
            {headers.map((header) => (
              <TableHead key={header} className="text-center">
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {Object.values(row).map((value, cellIndex) => (
                <TableCell
                  key={cellIndex}
                  className="text-center font-medium"
                >
                  {value}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
