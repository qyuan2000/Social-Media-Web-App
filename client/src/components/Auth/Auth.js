import React, {useState} from "react";
import { Avatar, Button, Paper, Grid, Typography, Container} from "@mui/material";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import LogoutIcon from '@mui/icons-material/Logout';
import { styles } from "./styles";
import Input from "./Input";
import Icon from "./icon";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { AUTH } from '../../constants/actionTypes';
import { signin, signup } from "../../actions/auth";

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const Auth = () => {
    const [isSignup, setIsSignup] = useState(false);
    const [form, setForm] = useState(initialState);
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const switchMode = () => {
        setForm(initialState);
        setIsSignup((prevIsSignup) => !prevIsSignup);
        setShowPassword(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form);
        if (isSignup) {
            dispatch(signup(form, navigate));
        } else {
            dispatch(signin(form, navigate));
        }
    };
    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleShowPassword = () => setShowPassword(!showPassword);

    const googleSuccess = async (res) => {
        const result  = res?.profileObj;
        const token = res?.tokenId;

        try {
            dispatch({ type: AUTH, data: { result, token } });

            navigate('/');
        } catch (error) {
            console.log(error);
        }
    };
    const googleError = () => alert('Google Sign In was unsuccessful. Try again later');

    //console.log("show auth page");
    return (
       <Container component="main" maxWidth="xs">
            <Paper style={styles.paper} elevation={3}>
                <Avatar style={styles.avatar}>
                    <LogoutIcon></LogoutIcon>
                </Avatar>
                <Typography variant="h5">{isSignup? 'Sign Up' : 'Sign In'}</Typography>
                <form style={styles.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {isSignup && (
                        <>
                            <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                            <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                        </>
                        )}
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                        { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" style={styles.submit}>
                        { isSignup ? 'Sign Up' : 'Sign In' }
                    </Button>
                    <GoogleOAuthProvider clientId="851834205513-nu2bsoinehdl0istc6f12es0i9tv3gdj.apps.googleusercontent.com">
                        <GoogleLogin
                            render={(renderProps) => (
                            <Button style={styles.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                                Google Sign In
                            </Button>
                            )}
                            onSuccess={googleSuccess}
                            onFailure={googleError}
                            cookiePolicy="single_host_origin"
                        />
                    </GoogleOAuthProvider>
                    <Grid container justify="flex-end">
                        <Grid item>
                        <Button onClick={switchMode}>
                            { isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
                        </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>

       </Container>
    );
}

export default Auth;