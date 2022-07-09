import { CircularProgress, Grid } from "@mui/material";

function Loading() {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      //style={{ height: "300px" }}
    >
      <Grid item>
        <CircularProgress color="inherit" />
      </Grid>
    </Grid>
  );
}

export default Loading;
