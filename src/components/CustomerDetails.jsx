import { Box, Typography } from "@mui/material";
import React from "react";

function CustomerDetails() {
  return (
    <>
      <Box width="100%">
        <Typography fontWeight="bold" color="orange">
          Bill To:
        </Typography>
        <Typography>Alstair Burko</Typography>
        <Typography>1156 High Street</Typography>
        <Typography>Santa Cruz, California, 95064</Typography>
      </Box>
    </>
  );
}

export default CustomerDetails;
