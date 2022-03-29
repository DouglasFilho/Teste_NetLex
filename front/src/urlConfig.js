import axios from "axios";

const http = axios.create({
        baseURL: 'http://localhost:3086'
});

export default http;