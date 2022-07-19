import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import { v4 as uuidv4 } from 'uuid';
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

app.post('/', (req, res) => {
    const _body = JSON.parse(req.body);
    console.log(`Set config: ${req.body}`);
    // config = _config;
    res.render('index',
        {config: config});
});

app.get('/add_config', (req, res) => {
    const id = uuidv4();
    res.render('add_config',
        {id: id});
});


app.post('/add_config', (req, res) => {
    res.render('index',
        {config: config});
});

app.post('/config', (req, res) => {
    console.log(req.body);
    if (config.hasOwnProperty(req.body.id)) {
        res.send(config[`${req.body.id}`]);
    } else {
        res.send(req.body);
    }
});

app.listen(port, () => {
    console.log(`Config app listening on port ${port}`);
})