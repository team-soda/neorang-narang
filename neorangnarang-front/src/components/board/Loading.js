// eslint-disable-next-line import/no-extraneous-dependencies
import { Box, Typography } from "@material-ui/core";

export default function Loading() {
  return (
    <Box mt={5}>
      <Typography variant="h5" align="center">
        Loading..
      </Typography>
    </Box>
  );
}
