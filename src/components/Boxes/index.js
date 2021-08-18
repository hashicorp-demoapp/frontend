import React from 'react'
import Box from '@material-ui/core/Box';
import logo from './HashiCorp_PrimaryLogo_White_RGB.png';





const Footer = () => {
  return (
  
     
        <Box

          borderColor="black"
          height={200}
          width='100%'
          display="flex"
          justifyContent="center"
          alignItems="center"
          bgcolor="#000000"
          color="WHITE"
          paddingTop = '50px'
          
        >
                  Powered by 
                  <img src={logo} height = "30%" width = "auto"    />




                  
     </Box>
       
  );
};

export default Footer;