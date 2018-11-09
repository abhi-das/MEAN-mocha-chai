import mongoose from 'mongoose';
import chai from 'chai';

import server from '../../server';

import { BookSchema } from '../models/book';

let chaiHttp = require('chai-http');
//Require the dev-dependencies
let should = chai.should();

chai.use(chaiHttp);

describe('Books', () => {

    // beforeEach((done) => { //Before each test we empty the database
    //     const Book = mongoose.model( 'Book', BookSchema );
    //     Book.remove({}, (err) => { 
    //        done();           
    //     });        
    // });

    /*
    * Test the /POST route
    */
    describe('/POST book', () => {
                
        it('it should POST a book', (done) => {

        const book = {
            bookname: "Wild Life",
            publisher: "John Willam",
            publishedDate: "02/02/2015",
            avaiable: true
        };

        chai.request(server)
            .post('/books')
            .send(book)
            .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                done();
            });
        });
    });

    /*
    * Test the /GET route
    */
    describe('/GET book', () => {

        it('it should GET all the books', (done) => {

        const Book = mongoose.model( 'Book', BookSchema );

        chai.request(server)
            .get('/books')
            .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(res.body.length);
                done();
            });
        });
    });

    /*
    * Test the /GET book by bookname field
    */
    describe('/GET a book by bookname', () => {
                
        it('it should GET a book by bookname', (done) => {

        // const Book = mongoose.model( 'Book', BookSchema );

        chai.request(server)
            .get('/books/Wild-Life')
            .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(res.body.length);
                done();
            });
        });
    });

    /*
    * Test the /POST route Fail Cases (without avaiable field)
    */
    describe('/POST book', () => {
                
        it('it should not POST a book without avaiable field', (done) => {

        const book = {
            bookname: "Wild Life",
            publisher: "John Willam",
            publishedDate: "02/02/2015",
        };

        chai.request(server)
            .post('/books')
            .send(book)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('errors');
                res.body.errors.should.have.property('avaiable');
                res.body.errors.avaiable.should.have.property('kind').eql('required');
                done();
            });
        });
    });
});