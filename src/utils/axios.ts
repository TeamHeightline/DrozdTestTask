import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL

const axiosClient = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosClient;
