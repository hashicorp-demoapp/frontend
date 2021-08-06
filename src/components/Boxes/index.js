import React from 'react'
import Box from '@material-ui/core/Box';
import logo from './HashiCorp_PrimaryLogo_White_RGB.png';





const MuiBox = () => {
  return (
  <div>
     
        <Box
          border={25}
          borderColor="black"
          height={200}
          width='100%'
          display="flex"
          justifyContent="center"
          alignItems="center"
          bgcolor="#000000"
          color="black"
          paddingTop = '30px'
          
        >
                  
                  <img src={logo} height = "50%" width = "auto%"    />




                  
     </Box>
        </div>
  );
};

export default MuiBox;