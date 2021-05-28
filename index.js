const {
    Webhook
} = require('simple-discord-webhooks');
const express = require('express')
const app = express()
const port = process.env.PORT || 4000;
const path = require('path')
const WebSocket = require('ws')
const wsserver = new WebSocket.Server({
    port: '8080'
})
var webhook = 'empty';
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({
    extended: false
}))


function setWebhook(thewebhook) {
    webhook = new Webhook(thewebhook);
}

wsserver.on('connection', socket => {
    console.log('Connection!')
    socket.on('message', (data) => {
        // console.log(data)
        if (data.includes('hookvalue')) {
            console.log(data)
            let hook = data.replace('hookvalue', '')
            setWebhook(hook)
            console.log(webhook)
        }
        if (data.includes('messagetosendforyoumydudebroskiahasfasdgasdf')) {
            let theactualmessage = data.replace('messagetosendforyoumydudebroskiahasfasdgasdf', '')
            webhook.send(theactualmessage)
        }
    })
})

// webhook.send('This message should get edited (hopefully) soon').then(async (result) => {
//     setTimeout(async () => {
//         await result.edit('And should get deleted (hopefully) soon');
//         console.log('Successfully edited send message!');
//     }, 3000);
//     setTimeout(async () => {
//         await result.delete();
//         console.log('Successfully deleted send message!');
//     }, 6000);
// });

// const message = webhook.resolveMessageID('820311219432194068');
// message.edit('Hello there!').then(() => console.log('Edited message'))



app.listen(port, () => console.log('Listening on port ' + port))