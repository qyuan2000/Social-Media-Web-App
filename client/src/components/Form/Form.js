import React, {useState, useEffect} from "react";
//import useStyles from "./styles";
import {styles} from './styles';
import { TextField, Button, Typography, Paper } from "@mui/material";
import FileBase64 from 'react-file-base64';
import {useDispatch, useSelector} from 'react-redux';
import { createPost, updatePost } from "../../actions/posts";


const Form = ({currentId, setCurrentId}) => {
    //const classes = useStyles();
    const [postData, setPostData] = useState({
        title:'', message:'', tags:'', selectedFile:''
    });
    const post = useSelector((state) => currentId? state.posts.find((p) => p._id === currentId) : null);
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));

    useEffect( () => {
        if(post) setPostData(post);
    }, [post]);

    const handleSubmit = (e) =>{
        e.preventDefault();

        if(currentId){
            dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
        }else{
            dispatch(createPost({ ...postData, name: user?.result?.name }));
        }
        clear();
    };

    const clear = () => {
        setCurrentId(0);
        setPostData({title:'', message:'', tags:'', selectedFile:''});
    };

    if (!user?.result?.name) {
        return (
          <Paper style={styles.paper}>
            <Typography variant="h6" align="center">
              Please Sign In to create your own memories and like other's memories.
            </Typography>
          </Paper>
        );
    }

    return(
        <Paper style={styles.paper}>
            <form autoComplete="off" noValidate style={styles.form} onSubmit={handleSubmit}>
            <Typography variant="h6">{currentId ? 'Editing' : 'Creating'} a Memory</Typography>
            <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })}/>
            <TextField name="message" variant="outlined" label="Massage" fullWidth value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })}/>
            <TextField name="tags" variant="outlined" label="Tags" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })}/>
            <div style={styles.fileInput}>
                <FileBase64 type="file" multiple={false} onDone={({base64}) => setPostData({...postData, selectedFile:base64})}/>
            </div>
            <Button style={styles.buttonSubmit} variant="container" color="primay" size="large" type="submit" fullWidth>Submit</Button>
            <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    );
}

export default Form;