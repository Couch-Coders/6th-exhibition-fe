import { useContext, useEffect, useState } from "react"
import { auth } from "../modules/fb"

export const MemberContext = React.createContext(null)
export const defaultHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
}

export const AuthProvider = ({children}) =>{
    const [member, setMember] = useState(null)
    const [registerFormOpen, setRegisterFormOpen] = useState(false)
    useEffect(()=>{
        auth.onAuthStateChanged(async (firebaseMember) => {
            if(firebaseMember){
                const token = await firebaseMember.getIdToken()
                defaultHeaders.Authorization = `Bearer ${token}`
                const res = await fetch("/members/me",{
                    method: "GET",
                    headers: defaultHeaders
                })
                if(res.status === 200){
                    const member = await res.json()
                    setMember(member)
                }else{
                    delete defaultHeaders.Authorizations
                    setMember(null)
                }
            }
        })
    }, [])
    return(
        <MemberContext.Provider value = {{member, setMember}}>
            {children}
        </MemberContext.Provider>
    )   
}

function Child(){
    const {member} = useContext(MemberContext)
    return(
        <div>
            {member? (<div><p>{member.nickname}</p></div>):(<div><p>로그인을 해주세요.</p></div>)}
            {member? (<button onClick={signOut}>Sign out</button>):(<button onClick={signInGoogle}>Sign in With Google</button>)}
        </div>
    ) 
}