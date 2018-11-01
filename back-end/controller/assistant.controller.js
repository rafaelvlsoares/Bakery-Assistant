require('dotenv').load()
const request = require('request')

const AssistantV1 = require('watson-developer-cloud/assistant/v1');

console.log(JSON.stringify(process.env))
const assistant_username = process.env.WATSON_ASSISTANT_USERNAME
console.log("Using following assistant username: "+assistant_username);
const assistant_password = process.env.WATSON_ASSISTANT_PASSWORD
console.log("Using following assistant password: "+assistant_password);
const assistant_url = process.env.WATSON_ASSISTANT_URL || "https://gateway.watsonplatform.net/assistant/api/"
console.log("Using following assistant url: "+assistant_url);
const assistant_version = process.env.WATSON_ASSISTANT_VERSION || '2018-10-25'
console.log("Using following assistant version: "+assistant_version);
const assistant_workspace = process.env.WATSON_ASSISTANT_WORKSPACE
console.log("Using following assistant workspace: "+assistant_workspace);
//Assistant Credentials
const assistant = new AssistantV1({
    username: assistant_username,
    password: assistant_password,
    url: assistant_url,
    version: assistant_version
});

//Send the input to conversation and return the response
const sendMessage = (input, _context) => {
    //console.log(input)
    return new Promise((resolve, reject) => {
        let context = (_context != null) ? _context : {};
        //console.log(JSON.stringify(context))
        if (input != null) {
            assistant.message({
                workspace_id: assistant_workspace,
                input: {
                    'text': input.text
                },
                context: context
            }, function (err, res) {
                if (err) {
                    console.log("ASSISTANT MESSAGE ERROR:" + err);
                    reject(err);
                } else {
                    //console.log(res)
                    resolve(res);
                }
            });
        } else {
            reject({
                err: true,
                msg: 'Input vazio'
            });
        }
    })
}

const sendMessageHTTP = (input, _context) => {
    return new Promise((resolve, reject) => {
        let context = (_context != null) ? _context : {};
        const rbody = {
            input: {
                text: input.text
            },
            context: context
        }
        if (input != null) {
            request({
                uri: process.env.assistant_url+"v1/workspaces/"+process.env.workspace_id+"/message?version=2018-09-20",
                body: JSON.stringify(rbody),
                method: 'POST',
                auth: {
                    user: process.env.assistant_username,
                    pass: process.env.assistant_password
                },
                headers: {
                    "Content-Type": "application/json"
                },
                agentOptions: {
                    rejectUnauthorized: false
                }
                
            }, function (err, res) {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    //console.log(res.body)
                    resolve(JSON.parse(res.body));
                }
            });
        } else {
            reject({
                err: true,
                msg: 'Input vazio'
            });
        }
    })
}

exports.sendMessageHTTP = sendMessageHTTP;
exports.sendMessage = sendMessage;