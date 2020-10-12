import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { AuthRouter } from './AuthRouter';
import { HomeScreen } from '../components/home/HomeScreen';
import { firebase } from '../firebase/firebaseConfig';
import { useDispatch } from 'react-redux';
import { login } from '../redux/actions/auth';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

import { CircularProgress, Backdrop } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }));

export const AppRouter = () => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const [checking, setChecking] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        firebase.auth().onAuthStateChanged( async (user) => {
            if (user?.uid) {
                dispatch(login(user.uid, user.displayName));
                setIsLoggedIn(true);
            } else { 
                setIsLoggedIn(false); 
            }
            setChecking(false);
        })
    }, [dispatch, setChecking, setIsLoggedIn]);

    if (checking) {
        return (
            <Backdrop className={classes.backdrop} open={checking}>
                <CircularProgress color="inherit" />
            </Backdrop>
        )
    }

    return (
        <Router>
            <Switch>
                <PublicRoute    isAuthenticated={ isLoggedIn } component={ AuthRouter }     path="/auth" />
                <PrivateRoute   isAuthenticated={ isLoggedIn } component={ HomeScreen }  exact path="/" />
                <Redirect       to="/auth/login" />
            </Switch>
        </Router>
    )
}
