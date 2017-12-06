import axios from 'axios';

const ROOT_URL = 'http://localhost:3000';

export function signinCounsellor({ email, password }) {
    return function(dispatch) {

        axios.post(`${ROOT_URL}/signincounsellor`, { email, password });
        console.log("hi");
 
    };
    
}