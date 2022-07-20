import express from 'express';
import path from 'path';
import {fileURLToPath} from 'url';
import bodyParser from 'body-parser';
import {v4 as uuidv4} from 'uuid';
import fs from 'fs';

const CONFIG_FILE_PATH = 'config.cfg';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express()
const port = 3000
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

// Edit configs
app.post('/', (req, res) => {
    config = req.body;
    saveConfigToFile();
    console.log(`Set config: ${req.body}`);
    res.redirect('/');
});

app.get('/add_config', (req, res) => {
    const id = uuidv4();
    res.render('add_config',
        {id: id});
});

// Add config
app.post('/add_config', (req, res) => {
    const _body = req.body;
    try {
        console.log(`Add config: ${JSON.stringify(_body)}`);
        // Test json config
        JSON.parse(_body.config);
        config[_body.id] = _body.config;
        saveConfigToFile();
        res.redirect('/');
    } catch (e) {
        res.send("Config is not JSON");
    }
});

// Test config
app.post('/config', (req, res) => {
    console.log(req.body);
    if (config.hasOwnProperty(req.body.id)) {
        try {
            const json = JSON.parse(config[`${req.body.id}`]);
            res.json(json);
        } catch (e) {
            res.json({"error": "Config is not JSON"});
        }
    } else {
        res.send({"error": "Config not found"});
    }
});

// Delete config
app.post('/delete_config', (req, res) => {
    console.log(`Deleting config: ${req.body}`);
    if (config.hasOwnProperty(req.body.id)) {
        delete config[`${req.body.id}`];
    }
    saveConfigToFile();
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Config app listening on port ${port}`);
    // Load config
    console.log(`Loading config`);
    readConfigFromFile();
})

function readConfigFromFile() {
    fs.readFile(CONFIG_FILE_PATH, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(`Config file: ${data}`);
        try {
            config = JSON.parse(data);
            console.log(`Set default config success`);
        } catch (e) {
            console.error(e, e.stack);
            console.log(`Set default config error`);
        }
    });
}

function saveConfigToFile() {
    fs.writeFile(CONFIG_FILE_PATH, JSON.stringify(config), function (err) {
        if (err) return console.log(err);
        console.log(`Config > ${CONFIG_FILE_PATH}`);
    });
}