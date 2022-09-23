import React from "react";
import CameraIcon from "@mui/icons-material/Camera";
import Button from "@material-ui/core/Button";
import { useMediaQuery } from "@material-ui/core";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

import { makeStyles } from "@material-ui/core/styles";
import { textTransform } from "@mui/system";

const fetchColor = (mob,tab) => {
  if (mob) {
    return "pink";
  } else if (tab) {
    return "blue";
  } else {
    return "red";
  }
};
const useStyles = makeStyles((theme) => ({
  text: {
    [theme?.breakpoints?.up('700')]:{
      color:"black",
      fontWeight:"bold"
    },
    [theme?.breakpoints?.down('500')]:{
      color:"red",
      textTransform:"uppercase"
    },
    [theme?.breakpoints?.between('500,700')]:{
      color:"green",
      textTransform:"lowercase"
    }

  },
  container: ({ mob, tab }) => ({
    color: fetchColor(mob, tab),
  }),
  // conti:({tab})=>({
  //   color: tab ? "pink" : "purple",
  // })
}));

const Mui = () => {
  const mob = useMediaQuery("(max-width:767px)");
  const tab = useMediaQuery("(max-width:1023px)");

  const classes = useStyles({ mob, tab });
  return (
    <div>
      {/* <CameraIcon style={{ fontSize: "50px", color: "purple" }} />
      <Button variant="contained" size="large" color="default">
        Hello
      </Button> */}

      {
        <div style={{ margin: "30px" }}>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              height="140"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaMeP5o5YXEU4MsnIoT-VFfO26WMiE9Lil1Q&usqp=CAU"
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                <div className={`${classes.text}`}>
                  Lizard
                </div>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" variant="outlined">
                Share
              </Button>
              <Button size="small" variant="contained">
                Learn More
              </Button>
            </CardActions>
          </Card>
        </div>
      }
      {/* Mobile : {mob.toString()}
        Tablet : {tab.toString()} */}
    </div>
  );
};

export default Mui;
