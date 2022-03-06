import { useEffect, useState, createContext } from 'react'
import { auth } from "./fb"
import { login } from '../APIs/MemberAPI';

export const MemberContext = createContext(null);
export default ({ children }) => {
    const [member, setMember] = useState(null)
    const [registerFormOpen, setRegisterFormOpen] = useState(false)
    useEffect(() => {
        auth.onAuthStateChanged(async (firebaseMember) => {
            if(firebaseMember)
            {
                try{
                    const token = await firebaseMember.getIdToken();
                    localStorage.setItem('token', `Bearer ${token}`);
                    // 특정 시간 경과 후 토큰 만료 / 세션 삭제
                    const res = await login();
                    if(res.status === 200){
                        const member = res.data;
                        setMember(member);
                    }else {
                        setRegisterFormOpen(true);
                    }
                }catch(err){
                    setRegisterFormOpen(true);
                    console.log(err);
                    throw new Error('login error');
                }
            }
            else {
                setRegisterFormOpen(true);
                setMember(null);
                localStorage.clear();
            }
        })
    }, [])
    
    return(
        <MemberContext.Provider value = {{ member, setMember, registerFormOpen, setRegisterFormOpen }}>
            {children}
        </MemberContext.Provider>
    );
};
