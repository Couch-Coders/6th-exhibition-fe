import { useContext, useState } from 'react';
import {
  Nav,
  NavLink,
  NavBtn
} from './Banner.style';
import { Button, Dropdown, Menu, Modal, Form, Input } from 'antd';
import { MemberContext } from '../../modules/AuthProvider';
import { signInGoogle, signOut } from '../../modules/fb';
import { ReactComponent as MemberIcon } from '../../common/member_default.svg';
import { Link } from 'react-router-dom';
import { register } from '../../APIs/MemberAPI';

function Banner () {
  const { member, registerFormOpen, setRegisterFormOpen, setMember } = useContext(MemberContext);
  const [registerForm] = Form.useForm();
  const menu = (
    <Menu>
      <Menu.Item>
        <Link to='/mypage'>
          마이페이지
        </Link>
      </Menu.Item>
      <Menu.Item>
        <a onClick={signOut}>Logout</a> 
      </Menu.Item>
    </Menu>
  );
  const [openModal, setOpenModal] = useState(false);
  console.log(member);
  async function signIn () {
    setOpenModal(true);
  }
const handleSubmit = async(value)=> {
  try{
    const res = await register(value);
    const member = res;
    setMember(member);
    setOpenModal(false);
    setRegisterFormOpen(false);
  }catch(err){
    console.log(err);
    throw new Error('register failed');
  }
}

  return (
    <>
      <Nav>
        <NavLink to='/'>
        <p style={{fontSize: "25px", marginRight: "15px"}}>🎨</p>예술한줌
        </NavLink>
        <NavBtn>
          {
            member? 
            <Dropdown overlay={menu} placement="bottomCenter">
            <div style={{ display: 'flex', alignItems: 'center', fontFamily: 'Roboto', fontStyle: 'normal', fontWeight: 400, fontSize: '14px', lineHeight: '22px' }}>{member.nickname} 
            <div style={{ width: '30px', height: '30px', marginLeft: '5px', background: '#F0F0F0', borderRadius: '40px', display: 'flex', placeContent: 'center' }}><MemberIcon style={{ display: 'flex', marginTop: '5px' }}/></div></div>
            </Dropdown>
            : 
            <Button type='primary' onClick={() => signIn() }>Sign In </Button>
          }
        </NavBtn>
        {registerFormOpen? <Modal visible={openModal} title="구글 계정을 이용하여 간편하게 가입 하세요." okText="Register" onCancel={() => setOpenModal(false)} onOk={()=>{
         registerForm.validateFields().then((value)=> {handleSubmit(value)})}}><img src='btn_google_signin_dark_normal_web.png' alt='sign in with google' onClick={() => {signInGoogle(); }}/>
        <Form form={registerForm} layout="vertical" name="register">
            <Form.Item name="nickname" label="사용할 닉네임"><Input /></Form.Item>
        </Form>
        </Modal>:
        <Modal visible={openModal} title="구글 계정을 이용하여 간편하게 로그인 하세요." footer={null} onCancel={() => setOpenModal(false)}><img src='btn_google_signin_dark_normal_web.png' alt='sign in with google' onClick={() => {signInGoogle(); setOpenModal(false)}}/> </Modal>
        }
      
      </Nav>
    </>
  );
};

export default Banner;