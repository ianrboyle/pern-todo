import express from 'express';
import bodyParser from 'body-parser';
const pool = require('./db/db');
// import bookRoutes from './routes/book';
const app = express();
const cors = require('cors');
//middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//ROUTES

//create TODO

app.post('/todos', async (req, res) => {
    try {
        console.log(req.body);
    } catch (err: any) {
        console.error(err.message);
    }
});
// get all TODOs

// get TODO

// update TODO

//delete todos
app.listen(5000, () => {
    console.log('server running on PORT 5000');
});
