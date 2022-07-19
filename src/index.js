const express = require('express')
const path = require('path')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json());
app.use(express.urlencoded());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

let config = {};

app.get('/', (req, res) => {
    res.render('index',
        {config: config});
});

app.post('/', (req, res) => {
    const _config = JSON.parse(req.body.config);
    console.log(`Set config: ${_config}`);
    config = _config;
    res.render('index',
        {config: config});
});

app.post('/config', (req, res) => {
    console.log(req.body);
    if (config.hasOwnProperty(req.body.id)) {
        res.send(config);
    } else {
        res.send(req.body);
    }
});

app.listen(port, () => {
    console.log(`Config app listening on port ${port}`);
})