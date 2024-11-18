import './App.css';
import AuthRouter from './config/routing/AuthRouter';
import AppRouter from './config/routing/AppRouter';
import { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Header from './components/Header/Header';
import { connect } from 'react-redux';

function App(props) {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const { theme } = props;

  const darkTheme = createTheme({
    palette: { mode: 'dark' },
  });

  const defaultTheme = createTheme({
    palette: {
      primary: {
        main: '#2158a4',
        drawer_icon: '#000000',
      },
    },
  });

  const lightTheme = createTheme({
    palette: { mode: 'light' },
  });

  const appTheme = theme === "default" ? defaultTheme : theme === "dark" ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={appTheme}>
      {userLoggedIn ? (
        <>
          <Header />
          <AppRouter />
        </>
      ) : (
        <AuthRouter onSignIn={() => setUserLoggedIn(true)} />
      )}
    </ThemeProvider>
  );
}

const mapStateToProps = (state) => ({
  language: state.language,
  theme: state.theme,
});

const mapDispatchToProps = (dispatch) => ({
  setLanguage: (lang) =>
    dispatch({
      type: "TOGGLELANG",
      value: lang === 'en' ? 'ar' : 'en',
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
