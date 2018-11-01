const express = require('express');
const conversationRouter = express.Router();
const conversationCrl = require('../controller/assistant.controller');

//Router to conversation
const router = () => {
    conversationRouter.route('/conversation')
        .post(send);

    return conversationRouter;
}
//Get the message and throws to conversation to handle the response
const send = (req, res) => {
    const input = (req.body.input != undefined) ? req.body.input : null;
    const context = (req.body.context != undefined) ? req.body.context : null;
    conversationCrl.sendMessage(input, context)
        .then((conversationResponse) => {
            res.send(conversationResponse);
        })
        .catch((err) => {
            res.sendStatus(500);
        })
}

module.exports = router;
