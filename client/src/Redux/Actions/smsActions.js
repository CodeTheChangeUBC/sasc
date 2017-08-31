export const RETRIEVE_SMSSETTINGS = "RETRIEVE_SMSSETTINGS";

function retrieveSMSSettings(json) {
    const { email, twilioPhoneNumber, accountSid, authToken } = json.data;
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
    return fetch("smssettings", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
            //credentials: "include"
        }
    })
    .then(response => response.json());
}

export function fetchSMSSettings() {
    console.log("inside fetchSMSSettings");
    return function(dispatch) {
        return fetchSMSSettingsJson()
            .then(json => dispatch(retrieveSMSSettings(json)));
    };
}