import { useRef } from "react";
import { signInGoogle } from "../../modules/fb";
import { Button } from "antd";
import RegisterForm from "../RegisterForm";


export default (props) => {
    const { setRegisterFormOpen } = props;
    const modalRef = useRef();
    const handleClickAway = (e) => {
        if(e.target.tagName === 'BUTTON') return;    
        if(!modalRef.current?.contains(e.tartet)) setRegisterFormOpen(false);
    }

    return <div 
    onClick={handleClickAway}
    >
    <RegisterForm setRegisterFormOpen={setRegisterFormOpen}/>
    <Button onClick={() => signInGoogle()}>구글로 로그인</Button>
    </div>
}