import axios from 'axios';
import {apiURL} from '../config';

export const sendPaymentInfos = (token, amount, cb = () => {}) => {

    console.log('token : ', token);
    console.log('amount : ', amount);

    const url = `${apiURL}/payments`;

    return axios.post(url,  {
        token : token,
        amount : amount
    });

}
