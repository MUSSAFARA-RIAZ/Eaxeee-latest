import React, { useState } from 'react'
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import CustomAppBar from './Components/CustomAppBar/CustomAppBar'
import Sidebar from './Components/SideBar/Sidebar';

function Header(props) {
    let { language, theme } = props

    const [Page, setPage] = useState("Home");
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
                            'body { background-color: #ffffff; }' :
                            (theme === 'dark') ?
                                'body { background-color: #212121; }' :
                                'body { background-color: #ffffff; }'
                    }
                </style>
            </Helmet>
            <CustomAppBar  toggleDrawer={toggleDrawer} changepage={changePageTitle} />
            <Sidebar lang={language} changePageTitle={changePageTitle} state={drawer} toggleDrawer={toggleDrawer} />
        </div>
    )
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
export default connect(mapStateToProps, mapDispatchToProps)(Header)
