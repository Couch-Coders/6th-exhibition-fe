import {React, useContext} from 'react';
import {
  Nav,
  NavLink,
  NavBtn
} from './Banner.style';
import { Button } from 'antd';
import { MemberContext } from '../../modules/AuthProvider';
import { signInGoogle, signOut } from '../../modules/fb';

const Banner = () => {
  const {member} = useContext(MemberContext)
  return (
    <>
      <Nav>
        <NavLink to='/'>
        <p style={{fontSize: "25px", marginRight: "15px"}}>🎨</p>예술한줌
        </NavLink>
        <NavBtn>
          {
            member? 
            <>
            Profile - onClick: modal show 
            member nickname
            <Button onClick={signOut}>Sign Out</Button> 
            </>
            : 
            <Button type='primary' onClick={signInGoogle}>Sign In </Button>
          }
         
        </NavBtn>
      </Nav>
    </>
  );
};

export default Banner;