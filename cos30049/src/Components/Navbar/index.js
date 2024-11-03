import React, { useState } from 'react';
import { Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink, SideNav } from './NavbarElements';
import { useLocation } from 'react-router-dom';
import '../../App.css';

const NavBar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <Nav>
        <NavLink to="/">
          <img
            className="logo"
            src={location.pathname === '/' ? '/logo3.png' : '/logo1.png'}
            alt="logo"
          />
        </NavLink>

        <Bars onClick={toggleMenu} />

        <SideNav isOpen={isMenuOpen}>
          <NavLink to="/about" activeStyle onClick={toggleMenu}>
            About
          </NavLink>
          <NavLink to="/dataVis" activeStyle onClick={toggleMenu}>
            Data Visualization
          </NavLink>
          <NavLink to="/predict" activeStyle onClick={toggleMenu}>
            Predict
          </NavLink>
          <NavLink to="/signup" activeStyle onClick={toggleMenu}>
            Sign up
          </NavLink>
          <NavLink to="/database" activeStyle onClick={toggleMenu}> 
            Database 
          </NavLink>
          <NavBtn>
            <NavBtnLink to="/signin" onClick={toggleMenu}>Sign In</NavBtnLink>
          </NavBtn>
        </SideNav>

        <NavMenu>
          <NavLink to="/about" activeStyle>
            About
          </NavLink>
          <NavLink to="/dataVis" activeStyle>
            Data Visualization
          </NavLink>
          <NavLink to="/predict" activeStyle>
            Predict
          </NavLink>
          <NavLink to="/signup" activeStyle>
            Sign up
          </NavLink>
          <NavLink to="/database" activeStyle>
            Database
          </NavLink>
        </NavMenu>

        <NavBtn>
          <NavBtnLink to="/signin">Sign In</NavBtnLink>
        </NavBtn>
      </Nav>
    </>
  );
};

export default NavBar;