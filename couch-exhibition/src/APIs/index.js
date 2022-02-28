import axios from 'axios';

const axiosInstance = axios.create({

    headers: {
        Authorization: localStorage.getItem('token')
    }

    });

axiosInstance.interceptors.request.use(
    config => {
        config.headers['Authorization'] = localStorage.getItem('token');
        return config;
    },
    err => {
        if(err.response.status === '401'){
            console.log('invalid authorization');
            console.log(err.response);
        }
        return Promise.reject(err);
    }
)

axiosInstance.interceptors.response.use(
    res => {
        console.log(res.data);
        return res;
    },
    err => {
        return Promise.reject(err);
    }
)

export default axiosInstance;