import Typography from "@mui/material/Typography";
import * as React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";

const Footer = () => {
  function Copyright() {
    return (
      <Typography variant="body2" color="text.secondary" align="center">
        {"Copyright © "}
        neorang-narang {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }

  const footers = [
    {
      description: ["Contact us"],
      href: "/contactUs",
    },
    {
      description: ["Youtube"],
      href: "https://www.youtube.com",
    },
    {
      description: ["Resource"],
      href: "https://www.youtube.com",
    },
    {
      description: ["View Source"],
      href: "https://github.com/team-soda",
    },
  ];

  return (
    <Container
      maxWidth="md"
      component="footer"
      sx={{
        borderTop: (theme) => `1px solid ${theme.palette.divider}`,
        py: [3, 6],
      }}
    >
      <Grid container spacing={4} justifyContent="space-evenly">
        {footers.map((footer) => (
          <Grid item xs={6} sm={3} key={footer.description}>
            <ul>
              {footer.description.map((item) => (
                <li key={item}>
                  <Link
                    href={footer.href}
                    style={{ textDecoration: "none" }}
                    variant="subtitle1"
                    color="text.secondary"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </Grid>
        ))}
      </Grid>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
};

export default Footer;
