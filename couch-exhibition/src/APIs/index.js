import axios from 'axios';

const axiosInstance = axios.create({ baseURL: 'http://localhost:3001' }); //json server
// const axiosInstance = axios.create({ baseURL: 'https://exhibition-here.herokuapp.com/' });
axiosInstance.defaults.headers.common['Authorization'] = 'FIREBASE AUTH TOKEN';

export default axiosInstance;