import { Box, Typography } from "@mui/material";
import React from "react";

function InvoiceHeader({ number }) {
  return (
    <Box display="flex" justifyContent="space-between">
      <Box>
        <Typography variant="h4">ZYLKAR CORPORATION</Typography>
        <Typography>1561 Appleview Town</Typography>
        <Typography>Bakers Street</Typography>
        <Typography>West Bengal, Kol 700001</Typography>
      </Box>
      <Box>
        <Typography variant="h5" color="orange">
          Invoice
        </Typography>
        <Typography textAlign="right">#{number}</Typography>
      </Box>
    </Box>
  );
}

export default InvoiceHeader;
