import axios from 'axios';

const ROOT_URL = 'http://localhost:3000';

export function getSMSDetails({ email }) {
    return function(dispatch) {        
        axios.get(`${ROOT_URL}/getSMSDetails`);
    };
}

export function setSMSDetails({ email, twilioPhoneNumber, twilioAccountSid, twilioAuthToken }) {
    return function(dispatch) {
        axios.post(`${ROOT_URL}/postSMSDetails`);
    };
}

export function deleteSMSDetails({ email }) {
    return function(dispatch) {
        axios.delete(`${ROOT_URL}/deleteSMSDetails`);
    };
}