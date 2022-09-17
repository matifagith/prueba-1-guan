import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {Nav, NavContainer, NavLogo,MiniContainer} from './StyledNavBar.js';

export default function NavBar (){
    const location = useLocation()
    return (
        <Nav>
            <NavContainer>            
            {location.pathname === '/home'? <MiniContainer><NavLogo to='/'>Landing</NavLogo><NavLogo to='/products'>Products</NavLogo></MiniContainer> : <NavLogo to='/home'>Home</NavLogo>}
            </NavContainer>
        </Nav>
    )
}