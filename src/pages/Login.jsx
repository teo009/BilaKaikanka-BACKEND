import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    return(
        <div>
            <span>Welcome to the login view</span>
            <Link to='/home'>Log in</Link>
        </div>
    );
}

export default Login;