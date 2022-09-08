import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {Nav, NavContainer, NavLogo} from './StyledNavBar.js';

export default function NavBar (){
    const location = useLocation()
    return (
        <Nav>
            <NavContainer>            
            {location.pathname === '/home'? <NavLogo to='/products'>Products</NavLogo> : <NavLogo to='/home'>Home</NavLogo>}
            </NavContainer>
        </Nav>
    )
}