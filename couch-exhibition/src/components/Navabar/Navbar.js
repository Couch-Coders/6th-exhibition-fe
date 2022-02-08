import {React, useContext} from 'react';
import {
  Nav,
  NavLink,
  NavBtn
} from './Navbar.style';
import { MemberContext } from '../AuthProvider';
import { signInGoogle, signOut } from '../../modules/fb';

const Navbar = () => {
  const {member} = useContext(MemberContext)
  return (
    <>
      <Nav>
        <NavLink to='/'>
          <h1>예술한줌</h1>
        </NavLink>
        <NavBtn>
          {
            member? 
            <>
            Profile - onClick: modal show 
            member nickname
            <button onClick={signOut}>Sign Out</button> 
            </>
            : 
            <button onClick={signInGoogle}>Sign In </button>
          }
         
        </NavBtn>
      </Nav>
    </>
  );
};

export default Navbar;