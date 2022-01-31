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
        const { description } = req.body;
        //$1 allows variables to be added to db?
        const newTodo = await pool.query('INSERT INTO todo (description) VALUES($1) RETURNING *', [description]);
        res.json(newTodo.rows[0]);
    } catch (err: any) {
        console.error(err.message);
    }
});
// get all TODOs

app.get('/todos', async (req, res) => {
    try {
        const allTodos = await pool.query('SELECT * FROM todo');
        res.json(allTodos.rows);
    } catch (err: any) {
        console.error(err.message);
    }
});

// get TODO

// update TODO

//delete todos
app.listen(5000, () => {
    console.log('server running on PORT 5000');
});
