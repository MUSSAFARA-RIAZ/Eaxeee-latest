import React, { useState } from 'react'
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import CustomAppBar from './Components/CustomAppBar/CustomAppBar'

function Header(props) {
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

    const changepage = (screenName) => {
        setPage(screenName)
    };

    return (
        <div>
            <CustomAppBar text={Page} toggleDrawer={toggleDrawer} changepage={changepage} />
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
