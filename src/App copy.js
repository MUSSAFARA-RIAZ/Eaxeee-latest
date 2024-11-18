import './App.css';
import AuthRouter from './config/routing/AuthRouter'
import AppRouter from './config/routing/AppRouter'
import { connect } from 'react-redux';
import { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Header from './components/Header/Header';
// import rtlPlugin from "stylis-plugin-rtl";
// import { CacheProvider } from "@emotion/react";
// import createCache from "@emotion/cache";

function App(props) {
  let { theme } = props

  const [userLoggedIn, setUserLoggedIn] = useState(true);

  const darkTheme = createTheme({
    // direction: "rtl",
    palette: {
      mode: 'dark',
    },
    tabColor: {
      backgroundColor: 'red'
    }
  });

  const defaultTheme = createTheme({
    // direction: "rtl",
    pallete: {
      primary: {
        main: '#2158a4',
        drawer_icon: '#000000'
      },
    },
  })

  const lightTheme = createTheme({
    // direction: "rtl",
    pallete: {
      mode: 'light'
    }
  })

  // const cacheRtl = createCache({
  //   key: "muirtl",
  //   stylisPlugins: [rtlPlugin]
  // });

  const appTheme = (theme === "default") ? defaultTheme : (theme === "dark") ? darkTheme : lightTheme;

  return (
    // <CacheProvider value={cacheRtl}>
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
    // </CacheProvider> 
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
