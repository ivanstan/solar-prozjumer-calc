import React from "react";
import {styled, TextField} from "@mui/material";

const CustomTextField = styled(TextField)(({theme}) => ({
  '& .MuiInputBase-input': {
    padding: '5px',
    maxWidth: 70,
    background: "#fff",
    borderRadius: 30,
  },
}));

const NegativeNumberInput = ({value, onChange}) => {

  const onInputChange = (e) => {
    let inputValue = parseFloat(e.target.value);

    if (inputValue < 0) {
      inputValue = inputValue * -1;
    }

    onChange(inputValue);
  }

  return <CustomTextField
    type="number"
    InputProps={{
      inputProps: { min: 0 }
    }}
    variant="outlined"
    value={value}
    onChange={(e) => onInputChange(e)}
  />
}

export default NegativeNumberInput;
