import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {Formik} from 'formik';
import {signInValidateSchema} from "../helpers/schemas/validate";
import Input from "../helpers/input/Input";
import {useDispatch} from "react-redux";
import {changeStatusAC} from "../../store/actions/authAction";

const theme = createTheme();

export default function SignInMain() {
    const dispatch = useDispatch();
    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Formik
                        initialValues={{
                            email: "", password: ""
                        }}
                        validationSchema={signInValidateSchema}
                        onSubmit={(values) => {
                            dispatch(changeStatusAC(values.email, values.password))
                        }}>
                        {({
                              values, errors, touched, handleChange, handleBlur, handleSubmit,
                          }) => (
                            <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                                <Grid item xs={12}>
                                    <Input name={"email"} type={"email"} fullWidth={true} label={"Email"}/>
                                </Grid>
                                <Input name={"password"} type={"password"} fullWidth={true}
                                       label={"Password"}/>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{mt: 3, mb: 2}}
                                >
                                    Sign In
                                </Button>
                                <Grid container>
                                    <Grid item>
                                        <Link href="/sign-up" variant="body2">
                                            {"Don't have an account? Sign Up"}
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Box>
                        )}
                    </Formik>

                </Box>
            </Container>
        </ThemeProvider>
    );
}