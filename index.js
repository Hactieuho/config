const express = require('express')
const app = express()
const port = 3000
let config1 = 'config1';
let config2 = 'config2';
let config3 = 'config3';
let config4 = 'config4';
let config5 = 'config5';

app.get('/', (req, res) => {
    res.send('Config list:');
});

app.get('/config1', (req, res) => {
    res.send(config1);
});

app.get('/config2', (req, res) => {
    res.send(config2);
});

app.get('/config3', (req, res) => {
    res.send(config3);
});

app.get('/config4', (req, res) => {
    res.send(config4);
});

app.get('/config5', (req, res) => {
    res.send(config5);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})