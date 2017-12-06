import axios from 'axios';

const ROOT_URL = 'http://localhost:3000';

export function getSMSDetails({ email, password }) {
    return function(dispatch) {        
        axios.get(`${ROOT_URL}/getSMSDetails`);
          
    };
    
}