import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, TextField } from "@mui/material";
import { Controller, set, useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function InvoiceBody({ data, email, name }) {
  const [paid, setPaid] = useState(false);
  const { control, watch, handleSubmit } = useForm({
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
    <>
      <form
        onSubmit={handleSubmit((data) => {
          axios
            .post(
              "https://d6hv1f8eaf.execute-api.us-east-1.amazonaws.com/scp-project/sendmail",
              {
                "from-email": "vikrantsonawane2@gmail.com",
                "from-name": "My Meedical",
                subject:
                  "Payment Confirmation for Your Recent Order at medibuddy",
                "text-part": `Dear ${name},

              Thank you for your recent purchase at our medical store. This email is to confirm that we have received your payment for your order.
              
              If you have any questions or concerns about your order, please feel free to contact us at any time. We are always happy to assist you.
              
              Thank you for choosing our medical store. We appreciate your business.
              
              Best regards,
              My Medical`,
                recipients: [{ Email: email }],
              },
            )
            .then((resp) => {
              if (resp.status === 200) {
                toast(`Email was sent to ${email}`);
              }
            });
          setPaid((paid) => true);
        })}
      >
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
              {rows.map((row) => (
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
                      render={({
                        field: { onChange, ...field },
                        fieldState: { error },
                      }) => (
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
                          onChange={(e) => {
                            const value = e.target.value;
                            if (value < 0) {
                              return onChange(0);
                            }
                            if (value > row.availableQuantity) {
                              return onChange(row.availableQuantity);
                            }
                            onChange(value);
                          }}
                        />
                      )}
                      rules={{ min: 0, max: row.availableQuantity }}
                    />
                  </TableCell>
                  <TableCell align="center">{row.price}</TableCell>
                  <TableCell align="right">{row.amount.toFixed(2)}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={2} />
                <TableCell align="center" sx={{ fontWeight: 500 }}>
                  Total ({paid ? "Paid" : "Due"})
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: 500 }}>
                  {total.toFixed(2)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        {!paid && (
          <Button
            variant="contained"
            color={paid ? "success" : "warning"}
            sx={{
              alignSelf: "end",
            }}
            type="submit"
          >
            {paid ? "Paid" : "Due"}
          </Button>
        )}
      </form>
    </>
  );
}
