import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { startRegisterWithEmailPasswordName } from '../../redux/actions/auth';
import { removeError, setError } from '../../redux/actions/ui';
import validator from 'validator';

import { TextField, InputAdornment, IconButton, Card, CardContent, Typography, Button, Snackbar, Container  } from '@material-ui/core';
import { Visibility, VisibilityOff, MailOutline, VpnKey } from '@material-ui/icons';
import MuiAlert from '@material-ui/lab/Alert';
import { SignInStyles } from '../../styles/components/auth/SignInStyles';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const RegisterScreen = () => {

    const classes = SignInStyles();
    const dispatch = useDispatch();

    const helperText = "";
    const { loading } = useSelector(state => state.ui);
    const [ values, setValues, handleInputChange ] = useForm({ name: '', email: '', password: '', password2: '', showPassword: false });
    const { name, email, password, password2, showPassword } = values;

    const { msgError } = useSelector(state => state.ui);

    const handleRegister = (e) => {
        e.preventDefault();
        if (isFormValid()) {
            dispatch(startRegisterWithEmailPasswordName(email, password, name));
        }
    }

    const isFormValid = () => {
        if (name.trim().length === 0) {
            dispatch(setError('Name is required'));
            return false;
        } else if (!validator.isEmail(email)) {
            dispatch(setError('Email is not valid'));
            return false;
        } else if (password !== password2 || password2.length < 5) {
            dispatch(setError('Password is not valid (should be at least 6 characters'));
            return false;
        }
        dispatch(removeError());
        return true;
    }

    const handleClickShowPassword = () => setValues({ ...values, showPassword: !values.showPassword });
    const handleMouseDownPassword = (event) => event.preventDefault();
    const handleClose = () => dispatch(removeError());

    return (
        <Container className={ classes.root }>
            {
                msgError && ( 
                    <Snackbar open={ msgError !== null } autoHideDuration={ 6000 } onClose={ handleClose } anchorOrigin={{ vertical: 'top', horizontal: 'center' }} >
                        <Alert onClose={ handleClose } severity="error">{ msgError }</Alert>
                    </Snackbar> 
                )
            }
            <Card className={ classes.card }>
                <CardContent>
                    <Typography variant="h5" component="h5">Create Account</Typography>

                    <form  className={ classes.form } noValidate autoComplete="off" onSubmit={ handleRegister }>

                        <TextField
                            required fullWidth label='Name' name='name' placeholder='Charlie'
                            value={ name } onChange={ handleInputChange } helperText={ helperText }
                            type='text'
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <MailOutline />
                                    </InputAdornment>
                                ),
                            }}
                        />

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

                        <TextField
                            required fullWidth label="Confirm Password" name="password2" placeholder="Confirm Password"
                            value={ password2 } onChange={ handleInputChange } helperText={ helperText }
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

                        <Button size="small" type="submit" disabled={ loading } className={ classes.button } variant="outlined">Create Account</Button>
                        
                        <Typography>
                            <Link to="/auth/login" className={ classes.link }>
                                <Button size="small" className={ classes.button } variant="contained" color="secondary">Already registered?</Button>
                            </Link>
                        </Typography>
                        
                    </form>

                </CardContent>
            </Card>
        </Container>
    )
}
