import React from 'react'
import Box from '@material-ui/core/Box';
import logo from './HashiCorp_PrimaryLogo_White_RGB.png';
import { Grid } from '@material-ui/core';




const MuiBox = () => {
  return (

    <Grid
    container
    direction="row"
    justifyContent="center"
    alignItems="center"
  >

     
        
                  
            <img src={logo} height = "10%"    />




                  
     
        </Grid>
  );
};

export default MuiBox;