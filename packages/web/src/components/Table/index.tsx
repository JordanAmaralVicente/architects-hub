import {
  Paper,
  Table as UITable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

interface Column {
  label: string;
  attr: string;
}

interface TableProps {
  rows: any[];
  columns: Column[];
}

export const Table = (props: TableProps): JSX.Element => {
  return (
    <TableContainer component={Paper}>
      <UITable>
        <TableHead>
          <TableRow>
            {props.columns.map((column) => (
              <TableCell>{column.label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rows.map((row) => {
            return (
              <TableRow key={row.id}>
                {props.columns.map((column) => (
                  <TableCell>{row[column.attr]}</TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </UITable>
    </TableContainer>
  );
};
