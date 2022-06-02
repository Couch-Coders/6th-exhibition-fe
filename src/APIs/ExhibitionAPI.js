import axiosInstance from ".";

export async function fetchExhibitions() {
    try{
        const res = await axiosInstance.get('/exhibitions/search');
        return res;
    }catch(err){
        console.log(err.response);
        throw new Error('Failed to load exhibitions data');
    }
}

export async function searchExhibitions(city, area, progress, keyword, sort){
    try{
        const res = await axiosInstance.get(`/exhibitions/search?city=${city}&size=50&area=${area}&progress=${progress}&keyword=${keyword}&sort=${sort}`);
        return res;
    }catch(err){
        console.log(err.response);
        throw new Error('Failed to load search result data');
    }
}

export async function getTopTen(){
    try{
        const res = await axiosInstance.get('/exhibitions/search/top10');
        return res;
    }catch(err){
        console.log(err.response);
        throw new Error('Failed to load top ten exhibitions data');
    }
}

export async function getExhibition(id) {
    try{
        const res = await axiosInstance.get(`/exhibitions/search/${id}`);
        return res;
    }catch(err){
        console.log(err.response);
        throw new Error('Failed to load exhibition data');
    }
}

export async function postLike(id){
    try{
        const res = await axiosInstance.post(`/exhibitions/${id}/likes`);
        return res;
    }catch(err){
        console.log(err.response);
        throw new Error('Failed to post like');
    }
}

export async function deleteLike(id){
    try{
        const res = await axiosInstance.delete(`/exhibitions/${id}/likes`);
        return res;
    }catch(err){
        console.log(err.response);
        throw new Error('Failed to delete like');
    }
}
