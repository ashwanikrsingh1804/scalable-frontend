import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useForm } from "react-hook-form";
import TextInput from "../components/TextInput";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreateCustomer() {
  const { control, handleSubmit } = useForm();
  const navigate = useNavigate();
  const onSubmit = (data) => {
    axios
      .post("https://opfhi0k7o6.execute-api.us-east-1.amazonaws.com/api/post", {
        name: data.name,
        email: data.email,
        contact: data.contact,
        prescriptionId: data.prescriptionId,
      })
      .then((resp) => {
        console.log(resp.status);
        navigate("/invoice/" + data.prescriptionId);
      });
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
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "invalid email address",
              },
            }}
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
            type="number"
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
