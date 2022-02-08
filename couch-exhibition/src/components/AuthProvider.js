import { useEffect, useState, createContext } from 'react'
import { auth } from "../modules/fb"

export const MemberContext = createContext(null)
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
                    console.log(member)
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

