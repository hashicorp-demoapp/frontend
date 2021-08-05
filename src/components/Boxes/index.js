import React from 'react'
import Box from '@material-ui/core/Box';
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

import InstagramIcon from "@material-ui/icons/Instagram";
import FacebookIcon from "@material-ui/icons/Facebook";
import GitHubIcon from "@material-ui/icons/GitHub";
import HomeIcon from "@material-ui/icons/Home";
import TwitterIcon from '@material-ui/icons/Twitter';

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