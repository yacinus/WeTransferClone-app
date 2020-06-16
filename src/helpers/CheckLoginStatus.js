import axios from 'axios';
import {apiURL} from '../config';
import Cookies from 'universal-cookie';

export const checkLoginStatus = () => {
    
    const cookies = new Cookies();
    const userId = cookies.get('userId');
    const url = `${apiURL}/users/${userId}`;
    
    const token = cookies.get('authorization');

    if(token) {

        return axios.get(url, {headers : {'authorization' : token}}).then((response) => {

            console.log('reponse', response);
            cookies.set('authorization', response.data.token.ops[0]._id, { path: '/' });

        }).catch(err => {
            console.log('error : ', err);
        })

    }

    

}