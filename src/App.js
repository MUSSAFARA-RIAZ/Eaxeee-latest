import './App.css';
import AuthRouter from './config/routing/AuthRouter';
import AppRouter from './config/routing/AppRouter';
import { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Header from './components/Header/Header';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';

function App(props) {
  console.log("localstoragewalivalue: ", sessionStorage.getItem('isUserLoggedIn'));
  const [userLoggedIn, setUserLoggedIn] = useState(sessionStorage.getItem('isUserLoggedIn') || false);
  const { theme } = props;
  const navigate = useNavigate();

  useEffect(() => {
    const currentPath = window.location.pathname;

    if (!userLoggedIn) {
      // Redirect to /login if userLoggedIn is false
      if (currentPath !== '/login') {
        navigate('/login', { replace: true });
      }
    } else {
      // Redirect to /home if userLoggedIn is true and the user is on /login
      if (currentPath === '/login') {
        navigate('/home', { replace: true });
      }
    }
  }, [userLoggedIn, navigate]);

  useEffect(() => {
    if (window.location.pathname === '/') {
      // Redirect to /login if user is at the root path
      navigate('/login', { replace: true });
    }
  }, [navigate]);

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
