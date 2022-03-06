import axiosInstance from "."

export async function login() {
    try{
        const res = await axiosInstance.get('/members/me');
        return res;
    }catch(err){
        console.log(err.response);
        if(err.response.status !== 200){
            return false;
        }
        throw new Error('Failed to load user data');
    }
}

export async function register(memberName){
    try{
        const res = await axiosInstance.post('/members', memberName);
        return res;
    }catch(err){
        console.log(err.response);
        throw new Error('Failed to register');
    }
}

export async function editMember(memberName){
    console.log(memberName);
    try{    
        const res = await axiosInstance.patch('/members/me', memberName);
        return res;
    }catch(err){
        console.log(err.response);
        throw new Error('Failed to update user');
    }
}

export async function deleteMember(){
    try{
        const res = await axiosInstance.delete('/members/me');
        return res;
    }catch(err){
        console.log(err.response);
        throw new Error('Failed to delete user');
    }
}

export async function getMyReviews(){
    try{
        const res = await axiosInstance.get('/members/me/reviews');        
        return res;
    }catch(err){
        console.log(err);
    }
}

export async function getLikes(){
    try{
        const res = await axiosInstance.get('/members/me/likes');
        return res;
    }catch(err){
        console.log(err);
    }
}

export async function getTopLikes(){
    try{
        const res = await axiosInstance.get('/members/me/likes3');
        return res;
    }catch(err){
        console.log(err);
    }
}
