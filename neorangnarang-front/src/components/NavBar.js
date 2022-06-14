import {AppBar, Button, Grid, Toolbar, Typography} from "@material-ui/core";

export default function NavBar() {
    return (
        <AppBar position="static">
            <Toolbar>
                <Grid justifyContent="space-between" container>
                    <Grid item>
                        <Typography variant="h6">너랑, 나랑!</Typography>
                    </Grid>
                    <Grid item>
                        <Typography
                            variant="body2"
                            style={{display: "inline-block", padding: "6px 8px"}}
                        >
                            NavBar
                        </Typography>
                        <Button color="inherit">
                            <Typography variant="body2">Sign in</Typography>
                        </Button>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    )
};


// import MKBox from "./MKBox";
//
// // Material Kit 2 React examples
// import DefaultNavbar from "./Navbars/DefaultNavbar";
//
// export default function NavBar() {
//     return (
//         <MKBox variant="gradient" bgColor="dark" shadow="sm" py={0.25}>
//             <DefaultNavbar
//                 action={{
//                     type: "external",
//                     route: "https://www.creative-tim.com/product/material-kit-react",
//                     label: "free download",
//                     color: "info",
//                 }}
//                 transparent
//                 relative
//                 light
//                 center
//             />
//         </MKBox>
//     );
// }
