import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-4ff3d.firebaseio.com/'
});

instance.defaults.headers.common['Authorization'] = 'AUTH TOKEN FROM INSTANCE';

// instance.interceptors.request...

export default instance;