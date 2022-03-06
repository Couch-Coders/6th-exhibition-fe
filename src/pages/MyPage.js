import { useContext, useState } from "react";
import { Wrapper, Division } from './pages.style';
import { useNavigate } from 'react-router-dom';
import { Button, Modal, Input, Form } from "antd";
import "antd/es/modal/style/css";
import { MemberContext } from "../modules/AuthProvider";
import DashBoard from "../components/DashBoard"
import { ReactComponent as EditIcon } from '../common/edit.svg'
import { deleteMember, editMember } from "../APIs/MemberAPI";
import { signOut, auth } from '../modules/fb';

function MyPage(){
    const { member, setMember } = useContext(MemberContext);
    const [isRopen, setIsRopen] = useState(false);
    const [isEopen, setIsEopen] = useState(false);
    const [editForm] = Form.useForm();
    const navigate = useNavigate();

    function removeMember() {
        setIsRopen(true);
    }
    function patchMember() {
        setIsEopen(true);
    }
    const handleRemove = async() => {
        try{
            const res = await deleteMember();
            console.log(res);
            if(res.status === 200){
                signOut();
                auth.currentUser.delete();
                localStorage.clear();
                navigate('/');
            }
        }catch(err){
            console.log(err);
        }
    }

    const handleEdit = async(value) => {
        console.log(value);
        try{
            const res = await editMember(value);
            setMember({...member, nickname: value.nickname})
            console.log(res);
            if(res.status === 200){
                setIsEopen(false)
            }
        }catch(err){
            console.log(err);
        }
    }

    const handleCancel = () => {
        setIsRopen(false);
        setIsEopen(false);
    }
    if(member){
        console.log(member);

        return(
            <Wrapper>
                <div className='title' style={{ fontFamily: 'Work Sans', fontStyle: 'normal', fontWeight: '700', fontSize: '28px', lineHeight: '32.84px', letterSpacing: '-2%', textAlign: 'left' }}>마이페이지</div>
                <Division style={{ width: '764px', marginTop: '13px' }} />
                <div className="member-container" style={{ display: 'flex', alignItems: 'center', marginTop: '25px', fontFamily: 'Roboto', fontWeight: '400', fontSize: '14px', lineHeight: '22px', fontStyle: 'normal'} }>
                    {/* editIcon은 onClick에 닉네임 수정, 회원탈퇴 button은 onClick에 모달로 확인 받고 회원 삭제 */}
                {member.nickname} <EditIcon style= {{ marginLeft: '11px' }} onClick={patchMember}/> 
                <Button style={{ background: '#F0F0F0', borderRadius: '2px', border: '1px solid #D9D9D9', boxShadow: '0px 2px 0px rgba(0, 0, 0, 0.016)', marginLeft: '45px' }} size = 'small' onClick={removeMember}> 회원탈퇴 </Button>
                </div>
                <div className="body">
                <DashBoard/>
                </div>
                {/* my likes list
                filter
                my reviews list
                filter */}
                <Modal title="회원 탈퇴" visible={isRopen} onOk={handleRemove} onCancel={handleCancel}>
                정말로 탈퇴하시겠습니까? 탈퇴 시 데이터 복구가 불가능합니다.
                </Modal>
                <Modal title="닉네임 수정" visible={isEopen} onOk={()=> {editForm.validateFields().then((value)=> handleEdit(value))}} onCancel={handleCancel}>
                <Form form={editForm} name="edit">
                    <Form.Item name="nickname">
                        <Input defaultValue={member.nickname}/>
                    </Form.Item>
                </Form>
                </Modal>
            </Wrapper>
        )
    }

    else
    return null;
    // member가 아닌 경우 진입 불가 -> main으로 보내든가 처리(router에서 접근을 미리 조정하는 편이 나음...)
}

export default MyPage