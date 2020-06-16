import axios from 'axios';
import {apiURL} from '../config';
import Cookies from 'universal-cookie';

export const createUserAccount = (user) => {

    console.log('user : ', user);

    const url = `${apiURL}/users`;

    return axios.post(url, user);

}

export const login = (email = null, password = null) => {
    
    const cookies = new Cookies();
    const url = `${apiURL}/users/login`;
    console.log('email : ', email);
    console.log('password : ', password);
    return axios.post(url, {
        email : email,
        password : password
    }).then((response) => {

        cookies.set('authorization', response.data.ops[0]._id, { path: '/' });
        cookies.set('userId', response.data.user._id, { path: '/' });

        //console.log('response should be token : ', response.data.ops[0]._id);
        //console.log('response user Id : ', response.data.user._id);
    });
}

//LOGOUT 