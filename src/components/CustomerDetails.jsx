import { Box, Typography } from "@mui/material";
import React from "react";

function CustomerDetails({ name }) {
  return (
    <>
      <Box width="100%">
        <Typography fontWeight="bold" color="orange">
          Bill To:
        </Typography>
        <Typography>{name}</Typography>
      </Box>
    </>
  );
}

export default CustomerDetails;
