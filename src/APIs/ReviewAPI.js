import axiosInstance from ".";

export async function getExhibitionReviews(id) {
    try{
        const res = await axiosInstance.get(`/exhibitions/${id}/viewAllReviews`);
        return res;
    }catch(err){
        console.log(err.response);
        throw new Error(`Failed to load review of exhibition ${id}`)
    }
}

export async function createReview(id, content) {
    try{
        const res = await axiosInstance.post(`/exhibitions/${id}/reviews`,content);
        return res;
    }catch(err){
        console.log(err);
    }
}

export async function updateReview(exhibitionId, content, reviewId){
    try{
        const res = await axiosInstance.patch(`/exhibitions/${exhibitionId}/reviews/${reviewId}`,content);
        return res;
    }catch(err){
        console.log(err);
    }
}

export async function deleteReview(exhibitionId, reviewId){
    try{
        const res = await axiosInstance.delete(`/exhibitions/${exhibitionId}/reviews/${reviewId}`)
        return res;    
    }catch(err){
        console.log(err);
    }
}