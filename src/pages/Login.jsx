import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Login.css';

const Login = () => {
    return(
        <div className='login-container'>
            <h2 className='title'>Divisas</h2>
            <div className='inputs-container'>
                <span>Iniciar sesión</span>
                <div className='inputs'>
                    <span>Nombre de usuario</span>
                    <input type="text" />
                    <span>Contraseña</span>
                    <input type="password" />
                </div>
                <Link className='login-btn' to='/home'>
                    Log in
                </Link>
            </div>
        </div>
    );
}

export default Login;