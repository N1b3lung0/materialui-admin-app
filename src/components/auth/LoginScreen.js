import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { startGoogleLogin, startLoginEmailPassword } from '../../redux/actions/auth';

import { TextField, InputAdornment, IconButton, Card, CardContent, CardMedia, Typography, Button, Tooltip, Container } from '@material-ui/core';
import { Visibility, VisibilityOff, MailOutline, VpnKey } from '@material-ui/icons';
import { SignInStyles } from '../../styles/components/auth/SignInStyles';

export const LoginScreen = () => {

    const classes = SignInStyles();
    const dispatch = useDispatch();

    const helperText = "";
    const { loading } = useSelector(state => state.ui);
    const [ values, setValues, handleInputChange ] = useForm({ email: '', password: '', showPassword: false });
    const { email, password, showPassword } = values;

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(startLoginEmailPassword(email, password));
    }
    const handleGoogleLogin = () => dispatch(startGoogleLogin());
    const handleClickShowPassword = () => setValues({ ...values, showPassword: !values.showPassword });
    const handleMouseDownPassword = (event) => event.preventDefault();

    return (
        <Container className={ classes.root }>
            <Card className={classes.card}>
                <CardContent>
                    <Typography variant="h5" component="h5">Sign In</Typography>

                    <form  className={ classes.form } noValidate autoComplete="off" onSubmit={ handleLogin }>

                        <TextField
                            required fullWidth label="Email" name="email" placeholder="mail@mail.me"
                            value={ email } onChange={ handleInputChange } helperText={ helperText }
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <MailOutline />
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <TextField
                            required fullWidth label="Password" name="password" placeholder="password"
                            value={ password } onChange={ handleInputChange } helperText={ helperText }
                            type={ showPassword ? 'text' : 'password' }
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <VpnKey />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton aria-label="toggle password visibility" onClick={ handleClickShowPassword } onMouseDown={ handleMouseDownPassword }>
                                            { showPassword ? <Visibility /> : <VisibilityOff /> }
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />

                        <Button size="small" type="submit" disabled={ loading } className={classes.button} variant="outlined">Sign In</Button>

                        <Typography color="textSecondary">Sign In with Social Networks</Typography>

                        <Tooltip classes={{ tooltip: classes.tooltip, arrow: classes.arrow }} title="Google" arrow placement="right" >
                            <Card className={classes.cardImage} onClick={ handleGoogleLogin }>
                                <CardMedia
                                    className={classes.cover}
                                    image="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                                    title="Google Sign In"
                                />
                                <CardContent>
                                    <Typography variant="subtitle1">Google</Typography>
                                </CardContent>
                            </Card>
                        </Tooltip>
                        
                        <Typography>
                            <Link to="/auth/register" className={ classes.link }>
                                <Button size="small" className={ classes.button } variant="contained" color="secondary">Create New Account</Button>
                            </Link>
                        </Typography>
                        
                    </form>

                </CardContent>
            </Card>
        </Container>
    )
}
