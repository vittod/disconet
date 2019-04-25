import axios from 'axios';

var instance = axios.create({
    xsrfCookieName: 'cToken',
    xsrfHeaderName: 'csrf-token'
});

export default instance;