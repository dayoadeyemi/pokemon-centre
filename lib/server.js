const pogobuf = require('pogobuf');
const config = require('../config.json');
const express = require('express');
const app = express();

app.get('/inventory', function (req, res) {
    client.getInventory(0)
    .then(pogobuf.Utils.splitInventory)
    .then(inventory => {
        res.send(inventory);
    })
    .catch(e => res.send(e))
});

app.use(express.static('public'));

var login = new pogobuf.PTCLogin(),
    client = new pogobuf.Client();

login.login(config.username, config.password)
.then(token => {
    client.setAuthInfo('ptc', token);
    return client.init();
}).then(u=> {
    app.listen(3000, function () {
        console.log('Pokemon centre listening on port 3000!');
    });
})
.catch(e => console.log(e));

