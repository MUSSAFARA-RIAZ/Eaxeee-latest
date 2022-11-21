import './App.css';
import AuthRouter from './config/routing/AuthRouter'
import AppRouter from './config/routing/AppRouter'
import { connect } from 'react-redux';
import { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Header from './components/Header/Header';

function App(props) {
  let { theme } = props

  const [userLoggedIn, setUserLoggedIn] = useState(true);

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
    tabColor: {
      backgroundColor: 'red'
    }
  });

  const defaultTheme = createTheme({
    pallete: {
      primary: {
        main: '#0D7E8A',
        drawer_icon: '#000000'
      },
    },
  })

  const lightTheme = createTheme({
    pallete: {
      mode: 'light'
    }
  })

  const appTheme = (theme === "default") ? defaultTheme : (theme === "dark") ? darkTheme : lightTheme;

  return (

    <ThemeProvider theme={appTheme}>
      {
        (userLoggedIn) ?
          <>
            <Header />
            <AppRouter />
          </>
          :
          <AuthRouter />
      }
    </ThemeProvider>
  );
}


const mapStateToProps = state => {
  return {
    language: state.language,
    theme: state.theme
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setLanguage: (lang) => {
      return dispatch({
        type: "TOGGLELANG",
        value: (lang === 'en') ? 'ar' : "en"
      })
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App)
