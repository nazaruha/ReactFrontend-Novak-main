import axios from 'axios';
import { APP_ENV } from './env';

const http = axios.create({
    baseURL: APP_ENV.BASE_URL, // дефолтно буде юзатись наша якась URL (не потрібно буде вводити в get(), post() etc. методах)
    headers: { // якісь правила вписуєм
        "Content-type": "application/json" // щоб переводили об'єкти javaScript в JSON
    }
});

export default http;