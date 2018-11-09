import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import bookRouters from './app/routers/book-router';

const app = express();
const PORT = 3000;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/bookstore', { useNewUrlParser: true });

// app.use((req, res, next) => {
//     req.db = db;
//     next();
// });

app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json());

bookRouters(app);

app.listen(PORT, () => {
    console.log(`express server up on ${PORT}`);
})

export default app;