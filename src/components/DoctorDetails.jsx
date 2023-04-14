import { Box, Typography } from "@mui/material";
import React from "react";

function DoctorDetails({ doctorName, email, phone, specilazation }) {
  return (
    <>
      <Box width="100%">
        <Typography fontWeight="bold" color="orange">
          Prescribed by:
        </Typography>
        <Typography>{doctorName}</Typography>
        <Typography component="span">{specilazation}</Typography>
        <Typography>{email}</Typography>
        <Typography>{phone}</Typography>
      </Box>
    </>
  );
}

export default DoctorDetails;
