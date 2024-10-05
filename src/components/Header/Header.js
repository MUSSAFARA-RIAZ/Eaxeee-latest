import React, { useState } from 'react'
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import CustomAppBar from './Components/CustomAppBar/CustomAppBar'
import Sidebar from './Components/SideBar/Sidebar';

function Header(props) {
    let { language, theme } = props
    const setPage="Home";

    const [drawer, setDrawer] = useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawer({ ...drawer, [anchor]: open });
    };

    const changePageTitle = (screenName) => {
        setPage(screenName)
    };

    return (

        <div>
            <Helmet htmlAttributes={{
                lang: language,
                dir: language === 'en' ? 'ltr' : 'rtl'
            }}>
                <style>
                    {
                        (theme === 'default') ?
                            'body { background-color: #cecece; }' :
                            (theme === 'dark') ?
                                'body { background-color: #212121; }' :
                                'body { background-color: #cecece; }'
                    }
                </style>
            </Helmet>
            <CustomAppBar toggleDrawer={toggleDrawer} changepage={changePageTitle} />
            <Sidebar lang={language} changePageTitle={changePageTitle} state={drawer} toggleDrawer={toggleDrawer} />
        </div>
    )
}

const mapStateToProps = state => {
    return {
        language: state.language,
        theme: state.theme,
        route: state.route,
        activeTree: state.activeTree,
        activeTable:state.activeTable,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setLanguage: (lang) => {
            return dispatch({
                type: "TOGGLELANG",
                value: (lang === 'en') ? 'ar' : "en"
            })



        },
        setTheme: (theme) => {
            return dispatch({
                type: "UPDATETHEME",
                value: theme,
            });
        },
        setRoute: (route) => {
            return dispatch({
                type: "UPDATEROUTE",
                value: route,
            });
        },
        
  setTree: (tree) =>
    dispatch({
      type: "ACTIVETREE",
      value: tree,
    }),
    setTable: (table) =>
        dispatch({
            type:"ACTIVETABLE",
            value: table,
            
        })
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header)
