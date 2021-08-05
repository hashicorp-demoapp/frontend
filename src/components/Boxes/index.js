import React from 'react'
import Box from '@material-ui/core/Box';
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

import InstagramIcon from "@material-ui/icons/Instagram";
import FacebookIcon from "@material-ui/icons/Facebook";
import GitHubIcon from "@material-ui/icons/GitHub";
import HomeIcon from "@material-ui/icons/Home";
import TwitterIcon from '@material-ui/icons/Twitter';
import styled from 'styled-components'

import { socialMedia } from './social';



const useStyles = makeStyles((theme) => ({
  snsIcon: {
    width: "30px",
    height: "30px",
    color:"white",

    [theme.breakpoints.down("xs")]: {
      width: "25px",
      height: "25px",
    },
    "&:hover": {
      color: theme.palette.common.white,
    },
  },
}));

const Logo = styled.div` //division in HTML document and it styled with css below
    position: absolute;
    top: calc(95% - 109px);
    
    z-index: 100; 
    svg {
        fill: #ffffff; /* black */
    }
`
const Title = styled.div`
    position: relative; //positions it relative to the logo
    left: 80px; //80px away from logo
    font-family: montserrat;
    font-size: 2em;
    width: 100px;
    font-weight: 70;
    z-index: 100;
    opacity: 0%;
    color: #fff;
    
`


const MuiBox = ({ color }) => {
  const classes = useStyles();
  // if you want to add more social medias, add it to here and /data/socialMedia.js.
  // and import the Material Icon, then add the code.
  const { instagram, facebook, github, homepage } = socialMedia;

  return (<div>
     
        <Box
          border={25}
          borderColor="black"
          height={200}
          width='100%'
          display="flex"
          justifyContent="center"
          alignItems="center"
          bgcolor="black"
          color="white"
          fontSize={24}
        >
                  
        <Grid
        item
        component={"a"}
        target="_blank"
        rel="noreferrer noopener"
        href={homepage}
      >
        <Logo>
                <a href="/">
                <svg id="logo_image" viewBox="0 0 100 100">
                    <g id="logo_path"><path d="M20 26.7l5.4-3V3.2L20 0v15.3h-6.9v-6l-5.5 3v20.5l5.5 3.2V20.7H20z"/>
                        <path d="M28 4.6v20.8l-8 4.4V36l13-7.5v-21zM13.1 0L0 7.5v21l5.1 2.9V10.6l8-4.4z"/>
                        </g>
                </svg>
                </a>
                <Title>HashiCups</Title>
            </Logo>
      </Grid>

      <Grid item container spacing={4} justify="center">
      <Grid
        item
        component={"a"}
        target="_blank"
        rel="noreferrer noopener"
        href={homepage}
      >
        <HomeIcon
          className={classes.snsIcon}
          color='black'
        />
      </Grid>
      <Grid
        item
        component={"a"}
        target="_blank"
        rel="noreferrer noopener"
        href={facebook}
      >
        <FacebookIcon
          className={classes.snsIcon}
          color={color ? "white" : "white"}
        />
      </Grid>
      <Grid
        item
        component={"a"}
        target="_blank"
        rel="noreferrer noopener"
        href={instagram}
      >
        <InstagramIcon
          className={classes.snsIcon}
          color={color ? "primary" : "secondary"}
        />
      </Grid>
      <Grid
        item
        component={"a"}
        target="_blank"
        rel="noreferrer noopener"
        href={github}
      >
        <GitHubIcon
          className={classes.snsIcon}
          color={color ? "primary" : "secondary"}
        />
      </Grid>
      {/* add social media*/}
    </Grid>



     </Box>
        </div>
  );
};

export default MuiBox;