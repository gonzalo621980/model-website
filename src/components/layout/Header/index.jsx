import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';

import { PublicRoutes } from '../../../routes/public';
import { PrivateRoutes } from '../../../routes/private';
import LogoReact from '../../common/LogoReact';
import { logout } from '../../../context/redux/actions/authAction';
import { addLog } from '../../../context/redux/actions/logAction';

import './index.css';


function Header() {

    const dispatch = useDispatch();

    const {isAuthenticated, username} = useSelector( (state) => state.auth );

    const handleClick = () => {
        dispatch( logout() );
        dispatch( addLog(`${username}: logout`) );
    }

    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">

            <Link to="/" className="navbar-brand p-left-10">Template Web App</Link>

            <LogoReact width="40" height="40" />

            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav navbar-routes">
                {!isAuthenticated && (
                    PublicRoutes.filter(item => item.showMenu).map((route, index) => (
                        <NavLink key={index} 
                            to={route.path}
                            className="nav-item nav-link"
                        > {route.title} </NavLink>
                    ))
                )}
                {isAuthenticated && (
                    PrivateRoutes.filter(item => item.showMenu).map((route, index) => (
                        <NavLink key={index} 
                            to={route.path}
                            className="nav-item nav-link"
                        > {route.title} </NavLink>
                    ))
                )}
                </div>
                <div className="navbar-nav">
                {isAuthenticated && (
                    <a onClick={ handleClick } className="nav-item nav-link p-right-10">Logout</a>
                )}
                </div>
            </div>
        </nav>
    )
}

export default Header;