export const RETRIEVE_SMSSETTINGS = "RETRIEVE_SMSSETTINGS";

function retrieveSMSSettings(json) {
    console.log("inside retrieveSMSSettings");
    const { email, twilioPhoneNumber, accountSid, authToken } = json.data;
    console.log(json.data);
    return {
        type: RETRIEVE_SMSSETTINGS,
        smssettings: {
            email,
            twilioPhoneNumber,
            accountSid,
            authToken
        }
    };
}

function fetchSMSSettingsJson() {
    return fetch("/smssettings/:id", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
            //credentials: "include"
        }
    })
    .then(response => {
        response.json();
    });
    
    /*var obj = {
      "email": "bean@example.com",
      "twilioPhoneNumber": "123456",
      "accountSid": "aaa",
      "authToken": "bbb"
    };
    return JSON.stringify(obj);*/
}

export function fetchSMSSettings() {
    return function(dispatch) {
        return fetchSMSSettingsJson()
            .then(json => dispatch(retrieveSMSSettings(json)));
    };
}
