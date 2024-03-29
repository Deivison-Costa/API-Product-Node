const mongoose = require('mongoose');
require('dotenv').config();

const mongoURL = process.env.MONGODB_URI;

// conecta ao mongoDB
async function main() {
    try {
        await mongoose.connect(mongoURL);
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Could not connect to MongoDB', err);
    }
}

module.exports = main;
