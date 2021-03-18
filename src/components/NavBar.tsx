import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NavBar = (): JSX.Element => {
    return (
        <NavContainer>
            <StyledLink to="/">Home</StyledLink>
            <StyledLink to="/favorites">Favorites</StyledLink>
        </NavContainer>
    );
};

const NavContainer = styled.nav`
    display: flex;
    width: 100%;
    height: 3em;
    color: white;
    align-items: center;
    justify-content: center;
`;

const StyledLink = styled(Link)`
    color: white;
    text-decoration: none;
    margin: 0 1em;
    font-size: 2em;

    :hover {
        color: yellow;
    }
`;

export default NavBar;
