import {
  Paper,
  Table as UITable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import { ReactNode } from "react";

interface Column {
  label: string;
  attr: string;
}

interface Action {
  actionNode: ReactNode;
  tooltip: string;
  onClick: (rowId: string) => void;
}

interface TableProps {
  rows: any[];
  columns: Column[];
  actions?: Action[];
}

export const Table = (props: TableProps): JSX.Element => {
  return (
    <TableContainer component={Paper}>
      <UITable>
        <TableHead>
          <TableRow>
            {props?.columns?.map((column, idx) => (
              <TableCell key={idx}>{column.label}</TableCell>
            ))}
            {props?.actions?.map((_, idx) => (
              <TableCell key={props?.columns.length + idx}></TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rows.map((row) => {
            return (
              <TableRow key={row.id}>
                {props.columns.map((column, idx) => (
                  <TableCell key={row.id + idx}>{row[column.attr]}</TableCell>
                ))}
                {!!props.actions && (
                  <>
                    {props.actions.map((action, idx) => (
                      <TableCell
                        key={idx}
                        onClick={() => {
                          action.onClick(row.id);
                        }}
                        sx={{ "&:hover": { cursor: "pointer" } }}
                      >
                        <Tooltip title={action.tooltip}>
                          <div>{action.actionNode}</div>
                        </Tooltip>
                      </TableCell>
                    ))}
                  </>
                )}
              </TableRow>
            );
          })}
        </TableBody>
      </UITable>
    </TableContainer>
  );
};
