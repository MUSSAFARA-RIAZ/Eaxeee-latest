// src/components/LottieAnimation.js
import React from 'react';
// import Lottie from 'react-lottie';
import animationData from '../Assets/Images/EaxeeLoader.gif'; // adjust the path to your JSON file

const LottieLoader = () => {
  

  return (
    <div style={{
      // position:"absolute",
      // top:"0",
      // left:"0",
      // width:"100%",
      // height:"100%",
      // display:"flex",
      // justifyContent:"center",
      // alignItems:"center",

      
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
   
      "margin":0,
      "position":"relative",
      "top":"80px"
      
    }}>
      <img src={animationData} alt='mussafara' style={{width:"60%",height:"60%"}} />
    </div>
  );
};

export default LottieLoader;
