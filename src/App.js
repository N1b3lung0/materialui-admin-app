import React, { useMemo } from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store/store';
import { AppRouter } from './routers/AppRouter';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import CssBaseline from '@material-ui/core/CssBaseline';

const App = () => {
	const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
	const theme = useMemo(() => createMuiTheme({
		palette: { type: prefersDarkMode ? 'dark' : 'light', },
	}), [prefersDarkMode])

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline/>
			<Provider store={ store }>
				<AppRouter />
			</Provider>
		</ThemeProvider>
	);
}

export default App;
