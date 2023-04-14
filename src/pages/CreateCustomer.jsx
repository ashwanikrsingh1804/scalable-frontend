import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useForm } from "react-hook-form";
import TextInput from "../components/TextInput";

export default function CreateCustomer() {
  const { control, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Create Contact
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextInput
            name="name"
            control={control}
            label="Name"
            rules={{ required: "Name is required" }}
          />
          <TextInput
            name="email"
            control={control}
            label="Email"
            rules={{ required: "Email is required" }}
          />
          <TextInput
            name="contact"
            control={control}
            label="Contact"
            rules={{ required: "Contact is required" }}
          />
          <TextInput
            control={control}
            name="prescriptionId"
            label="Prescription Id"
            rules={{ required: "Prescripton Id is required" }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Create Contact
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
