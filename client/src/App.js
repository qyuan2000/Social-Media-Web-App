import React from "react"; 
import {Container} from '@mui/material';//need to fit new package version
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Navbar from "./components/Navbar/Navbar";
//import useStyles from './styles';
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";

const App = () => {
    //const classes = useStyles();
    console.log("run app");
    return(
      <BrowserRouter>
        <Container maxWidth="lg">
          <Navbar />
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/auth" exact element={<Auth />} />
          </Routes>
        </Container>
      </BrowserRouter>
    );  
    
}

export default App;