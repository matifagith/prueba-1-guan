import styled from 'styled-components';
import {Link} from 'react-router-dom';
import {Container} from '../../styles/global.js';

export const Nav = styled.nav`
    background-color: #363659;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.2rem;
    position: sticky;
    z-index: 999;
`

export const NavContainer = styled(Container) `
    display: flex;
    justify-content: space-between;
    height: 80px;

  ${Container}
`;

export const NavLogo = styled(Link)`
    color: #fff;
    display: flex;
    /* justify-self: flex-start; */
    cursor: pointer;
    text-decoration: none;
    align-items: center;
    font-size: 2rem;
`