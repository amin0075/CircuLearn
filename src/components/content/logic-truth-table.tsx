import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@src/components/ui/table"

const TRUTH_ROWS = [
  { a: "0", b: "0", and: "0", or: "0", notA: "1" },
  { a: "0", b: "1", and: "0", or: "1", notA: "1" },
  { a: "1", b: "0", and: "0", or: "1", notA: "0" },
  { a: "1", b: "1", and: "1", or: "1", notA: "0" },
] as const

export function LogicTruthTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">A</TableHead>
          <TableHead className="text-center">B</TableHead>
          <TableHead className="text-center">A AND B</TableHead>
          <TableHead className="text-center">A OR B</TableHead>
          <TableHead className="text-center">NOT A</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {TRUTH_ROWS.map((row) => (
          <TableRow key={`${row.a}-${row.b}`}>
            <TableCell className="text-center font-medium">{row.a}</TableCell>
            <TableCell className="text-center font-medium">{row.b}</TableCell>
            <TableCell className="text-center">{row.and}</TableCell>
            <TableCell className="text-center">{row.or}</TableCell>
            <TableCell className="text-center">{row.notA}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
