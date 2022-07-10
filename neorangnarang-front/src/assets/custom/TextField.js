import { styled, TextField } from "@mui/material";

export const EditNameField = styled(TextField)({
  "&:hover": {
    borderBottomColor: "red",
  },
  "& label.Mui-focused": {
    color: "#faaf00",
  },
  "& .MuiInput-root:after": {
    borderBottomColor: "#ffc576",
  },
});
