import React from 'react'
import Box from '@material-ui/core/Box';
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import CardMedia from '@material-ui/core/CardMedia';

import styled from 'styled-components'

import { socialMedia } from './social';



const useStyles = makeStyles((theme) => ({
  

}));




const MuiBox = () => {
  const classes = useStyles();
  // if you want to add more social medias, add it to here and /data/socialMedia.js.
  // and import the Material Icon, then add the code.
  const {  homepage } = socialMedia;

  return (<div>
     
        
                  
        <Grid
        
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <CardMedia
        className={classes.media}
        image="../../public/img/HashiCorp_PrimaryLogo_White_RGB.png"
        
/>
      </Grid>
        </div>
  );
};

export default MuiBox;