import mongoose, { mongo } from 'mongoose';

import { BookSchema } from '../models/book';

const Book = mongoose.model( 'Book', BookSchema );

const bookRouters = (app) => {

    app.route('/books')
    // Get All the book
    .get((req, res) => {
        
        Book.find({}, (err, reqBookRes) => {

            if(err) {
                res.send(err);
            }

            res.json(reqBookRes);
        });
    })
    // Add new book
    .post((req, res) => {

        let changeCase = req.body;

        for(let key in changeCase) {
            changeCase[key] = changeCase[key].toString().toLowerCase();
        }

        let book = new Book(changeCase);

        book.save((err, newBookRes) => {
            if(err) {
                res.send(err);
            }
            res.json(newBookRes);
        })
    });

    app.route('/books/:byBookId')
    // Get Book by book name
    .get((req, res) => {

        let byParamId = req.params.byBookId.toString().split('-').join(' ').toLowerCase();

        Book.find({ bookname: byParamId }, (err, reqBookRes) => {

            if(err) {
                res.send(err);
            }

            res.json(reqBookRes);
        });
    })
    // Update Book Details by book name
    .put((req, res) => {

        let byParamId = req.params.byBookId.toString().split('-').join(' ').toLowerCase();

        Book.findOneAndUpdate({ bookname: byParamId }, req.body, { new : true }, (err, resUpdateBook) => {
            
            if(err) {
                res.send(err);
            }

            res.json(resUpdateBook);
        });
    })
    // Delete book by publisher name
    .delete((req, res) => {

        let byParamId = req.params.byBookId.toString().split('-').join(' ').toLowerCase();

        Book.remove({ publisher: byParamId }, (err, deleteRes) => {
            if(err) {
                res.send(err);
            }
            res.json({ "message" : "Book successful deleted!" });
        })
    });

};

export default bookRouters;
