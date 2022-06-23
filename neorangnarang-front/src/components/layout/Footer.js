import Typography from "@mui/material/Typography";
import * as React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

const Footer = () => {

    function Copyright() {
        return (
            <Typography variant="body2" color="text.secondary" align="center">
                {'Copyright © '}
                neorang-narang {' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        );
    }

    const footers = [
        {
            title: 'Company',
            description: ['Team', 'History', 'Contact us'],
        },
        {
            title: 'Features',
            description: [
                'Cool stuff',
                'Random feature',
                'Team feature',
            ],
        },
        {
            title: 'Resources',
            description: ['Resource', 'Another resource', 'Final resource'],
        },
        {
            title: 'Legal',
            description: ['Privacy policy', 'Terms of use'],
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
                    <Grid item xs={6} sm={3} key={footer.title}>
                        <Typography variant="h6" color="text.primary" gutterBottom>
                            {footer.title}
                        </Typography>
                        <ul>
                            {footer.description.map((item) => (
                                <li key={item}>
                                    <Typography variant="subtitle1" color="text.secondary">
                                        {item}
                                    </Typography>
                                </li>
                            ))}
                        </ul>
                    </Grid>
                ))}
            </Grid>
            <Copyright sx={{mt: 5}}/>
        </Container>
    );
}

export default Footer;