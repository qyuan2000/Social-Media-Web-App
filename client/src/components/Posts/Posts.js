import React from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { Grid, CircularProgress } from "@mui/material";

import Post from "./Post/Post";
//import useStyles from "./styles";
import {styles} from './styles';

const Posts = ({ setCurrentId }) => {
    const posts = useSelector((state) => state.posts);
    //const classes = useStyles();
    console.log(posts);

    return(
        !posts.length ? <CircularProgress />: (
            <Grid style={styles.mainContainer} container alignItems="stretch" spacing={3}>
                {posts.map((post) => (
                    <Grid key={post._id} item xs={12} sm={6}>
                        <Post post={post} setCurrentId={setCurrentId} />
                    </Grid>
                ))}
            </Grid>
        )
        
    );
}

export default Posts;