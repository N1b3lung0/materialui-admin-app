import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

export const SignInStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
        maxWidth: '100vw',
        background: '#F4F4F4'
    },
    card: {
        width: 500,
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        textAlign: 'center',
        background: '#F4F4F4',
        boxShadow: theme.shadows[10],
    },
    form: {
        '& > *': { marginTop: 24 },
        '& label.Mui-focused': { color: 'black' },
        '& .MuiInput-underline:after': { borderBottomColor: 'black' },
    },
    cardImage: {
        display: 'flex',
        height: 60,
        cursor: 'pointer',
        backgroundColor: red[500],
        color: '#FFFFFF'
    },
    cover: {
        width: 60,
        height: 60,
    },
    button: {
        display: 'block',
        width: '100%',
        textAlign: 'center',
        paddingTop: 20,
        paddingBottom: 20,
    },
    link: {
        textDecoration: 'none',
    },
    arrow: {
        color: theme.palette.common.black,
      },
    tooltip: {
        backgroundColor: theme.palette.common.black,
        boxShadow: theme.shadows[5],
        color: theme.palette.warning.light,
        fontSize: theme.typography.pxToRem(14),
    },
  }));