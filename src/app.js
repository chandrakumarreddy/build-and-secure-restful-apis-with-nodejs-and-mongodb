import express from 'express';
import logger from 'morgan';

const result = require('dotenv').config({ encoding: 'latin1' });

if (result.error) {
    throw result.error;
}

const PORT = 3000;

const app = express();
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
    app.use(logger('dev'));
}
app.get('/favicon.ico', (req, res) => res.status(404));
app.get('/sw.js', (req, res) => res.status(404));

app.get('/', (req, res) => res.status(200).json({ 'api health': 'good' }));

app.get((req, res, next) => {
    const error = new Error('not found');
    error.message = 'Invalid route';
    error.status = 404;
    next(error);
});
app.get((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message,
        },
    });
    return;
});

app.listen(PORT, () => {
    console.log(`server is listening at ${PORT}`);
});
