import React, { useState } from "react";
import { styled, TextField } from "@mui/material";

const CustomTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-input': {
    padding: '5px',
    maxWidth: 70,
    background: "#fff",
    borderRadius: 30,
  },
}));

const NegativeNumberInput = ({ value, onChange }) => {
  const [displayValue, setDisplayValue] = useState(
    value.toString().replace('.', ',')
  );

  const onInputChange = (e) => {
    let inputValue = e.target.value;

    if (/[^0-9,]/.test(inputValue)) return;

    setDisplayValue(inputValue);

    inputValue = parseFloat(inputValue.replace(',', '.'));

    if (!isNaN(inputValue)) {

      if (inputValue < 0) {
        inputValue = inputValue * -1;
      }

      onChange(inputValue); // Ensure positive value
    }
  };

  return (
    <CustomTextField
      type="text"
      variant="outlined"
      value={displayValue}
      onChange={onInputChange}
      inputProps={{
        inputMode: "decimal", // Ensures numeric keyboard on mobile
      }}
    />
  );
};

export default NegativeNumberInput;
