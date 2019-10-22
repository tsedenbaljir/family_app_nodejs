const { model, Schema } = require('mongoose');

const postSchema = new Schema({
    username: String,
});

module.exports = model('authors', postSchema);