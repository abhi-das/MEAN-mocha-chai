import mongoose from 'mongoose';

const BookTypeSchema = mongoose.Schema;

export const BookSchema = new BookTypeSchema({
    bookname: {
        type: String,
        required: true
    },
    publisher: {
        type: String,
        required: true
    },
    publishedDate: {
        type: Date,
        required: true
    },
    avaiable: {
        type: Boolean,
        required: true
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
})