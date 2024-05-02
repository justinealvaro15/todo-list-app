const express = require('express');
const app = express();
const PORT = 5000;

let DUMMY_DATA = [
    {
        id: '000001',
        content: 'To do 1',
        status: 'PENDING',
    },
    {
        id: '000002',
        content: 'To do 2',
        status: 'PENDING',
    },
    {
        id: '000003',
        content: 'To do 3',
        status: 'PENDING',
    },
];

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/todo', function (req, res) {
    res.json(DUMMY_DATA);
});

app.post('/todo', function (req, res) {
    const newEntry = req.body;
    DUMMY_DATA.push(newEntry);
    res.send(DUMMY_DATA);
});

app.patch('/todo/:id', function (req, res) {
    const id = req.params['id'];
    const updatedEntry = req.body;
    const index = DUMMY_DATA.findIndex((entry) => entry.id == id);
    DUMMY_DATA[index] = updatedEntry;
    res.send(DUMMY_DATA);
});

app.listen(PORT, function () {
    console.log(`Example app listening on port ${PORT}!`);
});