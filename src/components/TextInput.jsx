import { TextField } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

function TextInput({ name, control, label, rules, type = "text" }) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          margin="normal"
          required
          fullWidth
          label={label}
          error={Boolean(error)}
          type={type}
          helperText={error?.message}
          {...field}
        />
      )}
      rules={rules}
    />
  );
}

export default TextInput;
