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

//get TODO by ID
app.get('/todos/:id', async (req, res) => {
    try {
        //console.log(req.params) ==> logs the params (:id)
        const { id } = req.params;

        const todo = await pool.query('SELECT * FROM todo WHERE todo_id  = $1', [id]);
        res.json(todo.rows[0]);
    } catch (err: any) {
        console.error(err.message);
    }
});

// update TODO

app.put('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        const updateTodo = await pool.query('UPDATE todo SET description = $1 WHERE todo_id  = $2', [description, id]);

        res.json('Todo was updated');
    } catch (err: any) {
        console.error(err.message);
    }
});

app.delete('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleteTodo = await pool.query('DELETE FROM todo WHERE todo_id  = $1', [id]);

        res.json('Todo was deleted');
    } catch (err: any) {
        console.error(err.message);
    }
});

//delete todos
app.listen(5000, () => {
    console.log('server running on PORT 5000');
});
