import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import useStyles from './styles';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { createPosts, updatePost } from '../../actions/posts';


const Form = ({currentId, setCurrentId})=> {
  const [postData, setPostData] = useState({ creator: '', title: '', message: '', tags: '', selectedFile: '' });
  const classes = useStyles();
  const dispatch = useDispatch();
  const post = useSelector((state)=> currentId ? state.posts.find((post)=> post._id === currentId) : null);
  const clear = () => {
    setCurrentId(null);
    setPostData({ creator: '', title: '', message: '', tags: '', selectedFile: '' });
  };

  useEffect(() => {
    if(post) setPostData(post);
  }, [post]); // when post changes(from null to post which we find it), we want to call this function
  

  const handleSubmit = async (e) => {
    e.preventDefault(); // do not get refresh in the browser
    if(currentId){
      dispatch(updatePost(currentId, postData));
    }else {
      dispatch(createPosts(postData));
    }
    clear();
  };


  return (
    <Paper className={classes.paper} variant="outlined" >
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit} /* have multiple format */>
        <Typography variant="h6">{currentId ? 'Editing' : 'Creating'} a Memory</Typography>
        <TextField 
          name="creator" 
          variant="outlined" 
          label="Creator" 
          fullWidth 
          value={postData.creator} //value store in the state called postData (create before)
          onChange={(e) => setPostData({ ...postData, creator: e.target.value })} /* first spread the post Data, change the value of state*/ /> 
        <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
        <TextField name="message" variant="outlined" label="Message" fullWidth multiline rows={4} value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
        <TextField name="tags" variant="outlined" label="Tags (coma separated)" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
        <div className={classes.fileInput}>
          <FileBase 
            type="file" 
            multiple={false}  // only need one
            onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} />
        </div>
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
  )
}


export default Form