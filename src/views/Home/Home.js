import React from 'react'
import { Box } from '@mui/material'
import styles from "./Home.module.css"

import Logo from "../../Assets/Images/no_bg_logo.png"

function Home(prpos) {
    return (
        <Box className={styles.main} >
                <Box
                  component="img"
                  className={styles.logo}
                  alt="Eaxee logo."
                  src={Logo}
                />
        </Box>
    )
}

export default Home
