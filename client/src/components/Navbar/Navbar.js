import React, { useState, useEffect } from 'react';
import {Avatar, Button, Toolbar, Typography} from '@mui/material';
import { StyledAppBar, styles } from './styles';
import memories from '../../images/memories.jpeg';
import { useDispatch } from 'react-redux';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import decode from 'jwt-decode';

const Navbar = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
    
        navigate('/auth');
    
        setUser(null);
    };

    useEffect(() => {
        const token = user?.token;

        if (token) {
            const decodedToken = decode(token);

            if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }

        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

    return(
        <StyledAppBar position="static" color="inherit">
            <div>
                <Typography component={Link} to="/" variant="h2" align="center">Memories</Typography>
                <img src={memories} alt="memories" height="60" style={styles.image }/>
            </div>
            <Toolbar style={styles.toolbar}>
                {user?.result? (
                    <div>
                        <Avatar style={styles.purple} alt={user?.result?.name} src={user?.result?.imageUrl}>{user?.result?.name.charAt(0)}</Avatar>
                        <Typography style={styles.userName} variant='h6'>{user.result.name}</Typography>
                        <Button variant='contained' color='secondary' onClick={logout} >Logout</Button>
                    </div>
                ):(
                    <Button component={Link} to="/auth" variant='contained' color='primary'>Sign in</Button>
                )}
            </Toolbar>
        </StyledAppBar>
    );
};

export default Navbar;