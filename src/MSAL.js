const msalConfig = {
    auth: {
        clientId: "YOUR_FRONTEND_APP_CLIENT_ID",
        authority: "https://Mattamydemo.b2clogin.com/Mattamydemo.onmicrosoft.com/B2C_1_sign_up_sign_in",
        redirectUri: window.location.origin,
    },
    cache: {
        cacheLocation: "localStorage",
        storeAuthStateInCookie: false,
    }
};

const myMSALObj = new Msal.UserAgentApplication(msalConfig);

function callApi() {
    const user = myMSALObj.getAccount();
    if (user) {
        const tokenRequest = {
            scopes: ["https://Mattamydemo.onmicrosoft.com/api/read"],
            account: user
        };
        myMSALObj.acquireTokenSilent(tokenRequest).then((tokenResponse) => {
            fetch('https://backendmattamy.azurewebsites.net/yourEndpoint', {
                headers: {
                    'Authorization': 'Bearer ' + tokenResponse.accessToken
                }
            })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error('Error:', error));
        }).catch((error) => {
            console.error(error);
        });
    }
}
