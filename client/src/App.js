import React,  { useState, useEffect } from "react";
// create application UI without need to write a lot of styling
import { Container, AppBar, Typography, Grow, Grid} from '@material-ui/core';
import { useDispatch } from 'react-redux';

import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';
import memories from './images/memories.png';
import useStyles from './styles.js';
import { getPosts } from './actions/posts';
// Grow for simple animation
//Grid container type, xs = extra small devices use full width
// take 7 out of 12 for small and median devices
const App = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [currentId, setCurrentId] = useState(null);
  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]); // dependency array,when dispatch changes, we want to call this function


  return(
    <Container maxidth="lg">
      <AppBar className = {classes.appBar} position = "static" color = "inherit">
          <Typography className={classes.heading} variant="h2" >Memories</Typography>
          <img className={classes.image} src={memories} alt="memories" height="60" />
      </AppBar>
       
      <Grow in>
        <Container>
          <Grid container justify = "space-between" alignItems = "stretch" spacing = {3}>
            <Grid item xs={12} sm={7}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>

  )
}

export default App;