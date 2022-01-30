import express from 'express';
import bodyParser from 'body-parser';

// import bookRoutes from './routes/book';
const app = express();
const cors = require('cors');
//middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.listen(5000, () => {
    console.log('server running on PORT 5000');
});
