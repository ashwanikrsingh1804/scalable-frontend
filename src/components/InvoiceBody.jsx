import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";

export default function InvoiceBody({ data }) {
  const { control, watch } = useForm({
    defaultValues: {
      quantities: Object.fromEntries(data.map((row) => [row.ID, 1])),
    },
    reValidateMode: "onChange",
  });
  const quantities = watch("quantities");

  const rows = data.map((row) => ({
    ...row,
    availableQuantity: row.quantity,
    quantity: quantities[row.ID],
    amount: quantities[row.ID] * row.price,
  }));

  const total = rows.reduce((a, b) => a + b.amount, 0);

  return (
    <TableContainer component={Paper} variant="outlined">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Description</TableCell>
            <TableCell align="center">Quantity</TableCell>
            <TableCell align="center">Unit Price</TableCell>
            <TableCell align="right">Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => {
            console.log(row);
            return (
              <TableRow
                key={row.name}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  verticalAlign: "top",
                }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="center">
                  <Controller
                    name={`quantities.${row.ID}`}
                    control={control}
                    defaultValue={row.quantity}
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        variant="standard"
                        size="small"
                        type="number"
                        inputProps={{
                          style: {
                            textAlign: "center",
                            border: "none",
                            margin: 0,
                          },
                          min: 0,
                          max: row.availableQuantity,
                        }}
                        InputProps={{
                          disableUnderline: true,
                        }}
                        sx={{
                          border: "none",
                        }}
                        error={Boolean(error)}
                        helperText={error?.message}
                        {...field}
                      />
                    )}
                    rules={{ min: 0, max: row.availableQuantity }}
                  />
                </TableCell>
                <TableCell align="center">{row.price}</TableCell>
                <TableCell align="right">{row.amount.toFixed(2)}</TableCell>
              </TableRow>
            );
          })}
          <TableRow>
            <TableCell colSpan={2} />
            <TableCell align="center" sx={{ fontWeight: 500 }}>
              Total
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: 500 }}>
              {total.toFixed(2)}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
