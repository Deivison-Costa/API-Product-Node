const mongoose = require('mongoose');
require('dotenv').config();

// conecta ao mongoDB
async function main() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Could not connect to MongoDB', err);
    }
}

module.exports = main;