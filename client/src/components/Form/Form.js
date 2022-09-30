import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import useStyles from './styles';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { createPosts, updatePost } from '../../actions/posts';
import { FilePond, File, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css'

import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import FilePondPluginFileEncode from 'filepond-plugin-file-encode';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';

const Form = ({currentId, setCurrentId})=> {
  registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview, FilePondPluginFileEncode, FilePondPluginFileValidateType, FilePondPluginFileValidateSize);
  const [files, setFiles] = useState([])
  const [postData, setPostData] = useState({ creator: '', title: '', message: '', tags: '', selectedFile: '' });
  const classes = useStyles();
  const dispatch = useDispatch();
  const post = useSelector((state)=> currentId ? state.posts.find((post)=> post._id === currentId) : null);
  const clear = () => {
    setCurrentId(null);
    setPostData({ creator: '', title: '', message: '', tags: '', selectedFile: '' });
    setFiles([]);
  };

  useEffect(() => {
    if(post) setPostData(post);
  }, [post]); // when post changes(from null to post which we find it), we want to call this function
  

  const handleSubmit = async (e) => {
    e.preventDefault(); // do not get refresh in the browser
    var data = 'data:image/png;base64,';
    const data2 = data.concat(files[0] ? files[0].getFileEncodeBase64String() : null);
    postData.selectedFile = data2;
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
          <FilePond
            files={files}
            onupdatefiles={setFiles}
            allowMultiple={false}
            allowFileEncode={true}
            maxFiles={1}
            acceptedFileTypes = {['image/png']}
            maxFileSize = '1MB'
            name="files" 
            labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
            labelMaxFileSizeExceeded={'File is too large'}
          />
        </div>
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
  )
}


export default Form