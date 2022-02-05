import React from 'react';
import {
  Nav,
  NavLink,
  NavBtn,
  NavBtnLink
} from './Navbar.style';

const Navbar = () => {
  return (
    <>
      <Nav>
        <NavLink to='/'>
          <h1>예술한줌</h1>
        </NavLink>
        <NavBtn>
          <NavBtnLink to='/signin'>Sign In</NavBtnLink>
        </NavBtn>
      </Nav>
    </>
  );
};

export default Navbar;