require('dotenv').load()
const request = require('request')

const AssistantV1 = require('watson-developer-cloud/assistant/v1');

console.log("Using following assistant username: "+process.env.assistant_username);
console.log("Using following assistant password: "+process.env.assistant_password);
console.log("Using following assistant url: "+process.env.assistant_url);
//Assistant Credentials
const assistant = new AssistantV1({
    username: process.env.assistant_username,
    password: process.env.assistant_password,
    url: process.env.assistant_url,
    version: '2018-10-25'
});

//Send the input to conversation and return the response
const sendMessage = (input, _context) => {
    //console.log(input)
    return new Promise((resolve, reject) => {
        let context = (_context != null) ? _context : {};
        //console.log(JSON.stringify(context))
        if (input != null) {
            assistant.message({
                workspace_id: process.env.workspace_id,
                input: {
                    'text': input.text
                },
                context: context
            }, function (err, res) {
                if (err) {
                    console.log(err);
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