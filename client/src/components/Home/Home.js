import React , {useEffect, useState} from "react";
import {Container, Grow, Grid, ThemeProvider, useTheme} from '@mui/material';
import { useDispatch } from "react-redux";

import {getPosts} from '../../actions/posts';
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import { styles } from "./styles";

const Home = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const [currentId, setCurrentId] = useState(0);

    useEffect( () => {
        dispatch(getPosts());
    }, [currentId, dispatch]);

    console.log("show home page");

    return(
        <Grow in>
            <Container>
                
                    <Grid container justify="space-between" alignItems={"stretch"} spacing={3}>
                        <Grid item xs={12} sm={7}>
                            <Posts setCurrentId={setCurrentId} />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Form currentId={currentId} setCurrentId={setCurrentId} />
                        </Grid>
                    </Grid>
                
            </Container>
        </Grow>
    );
    
}

export default Home;