import { useContext, useState } from "react";
import { Wrapper, Division } from './pages.style';
import { useNavigate } from 'react-router-dom';
import { Button, Modal, Input } from "antd";
import "antd/es/modal/style/css";
import { MemberContext } from "../modules/AuthProvider";
import DashBoard from "../components/DashBoard"
import { ReactComponent as EditIcon } from '../common/edit.svg'
import { deleteMember } from "../APIs/MemberAPI";
import { signOut } from '../modules/fb';

function MyPage(){
    const { member } = useContext(MemberContext);
    const [isRopen, setIsRopen] = useState(false);
    const [isEopen, setIsEopen] = useState(false);
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
                localStorage.clear();
                signOut();
                navigate('/');
            }
        }catch(err){
            console.log(err);
        }
    }

    const handleEdit = (e) => {
        e.preventDefault();
    }

    const handleCancel = () => {
        setIsRopen(false);
        setIsEopen(false);
    }
    if(member)
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
            <Modal title="닉네임 수정" visible={isEopen} onOk={handleEdit} onCancel={handleCancel}>
            <Input value={member.nickname}/>
            </Modal>
        </Wrapper>
    )
    else
    return null;
    // member가 아닌 경우 진입 불가 -> main으로 보내든가 처리(router에서 접근을 미리 조정하는 편이 나음...)
}

export default MyPage