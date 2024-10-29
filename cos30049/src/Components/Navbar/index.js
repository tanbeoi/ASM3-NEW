import React from 'react';
import { Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink } from './NavbarElements';

const NavBar = () => { 
  return (
    <>
      <Nav>
          <NavLink to="/">
               <img className="logo" src="/logo1.png" alt="logo" />
          </NavLink>

          <Bars />

          <NavMenu>
               <NavLink to="/" activeStyle>
               Home 
               </NavLink>
               <NavLink to="/about" activeStyle>
               About
               </NavLink>
               <NavLink to="/dataVis" activeStyle>
               Data Visualization
               </NavLink>
               <NavLink to="/predict" activeStyle>
               Predict 
               </NavLink>
               <NavLink to="/contacts" activeStyle>
               Contacts
               </NavLink>
          </NavMenu>

          <NavBtn>
               <NavBtnLink to="/signin">Sign In</NavBtnLink>
          </NavBtn>
      </Nav>
    </>
  )
}

export default NavBar;