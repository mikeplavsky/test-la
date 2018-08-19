type Config = {
    client_id: String,
    client_secret: String,
    workspace_id: String};

const config = require('./config.js') as Config;
const query = require('./query.js');

let call = require('node-fetch');

let AuthenticationContext = require("adal-node").AuthenticationContext;
let context = new AuthenticationContext("https://login.windows.net/quest.com");

let get_token = async () => {

    let res = new Promise((res,rej) => {

        context.acquireTokenWithClientCredentials(

            "https://api.loganalytics.io",

            config.client_id,
            config.client_secret,

            (err,t) => {

                if (err != null) { rej(err);}
                else {res(t);}

        })});

    let token = await res; 
    console.log(token);

    return token;

};

type Token = {
    accessToken
};

let exec = async () => {

    let t = await get_token() as Token;

    let w_id = config.workspace_id;
    let url = `https://api.loganalytics.io/v1/workspaces/${w_id}/query`

    const opts = {
        method: "POST",
        body: JSON.stringify({
            query: query
        }),
        headers : {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${t.accessToken}`
        }};

    let res = await call(url, opts);
    let body = await res.text();

    console.log(body);

}

exec();
