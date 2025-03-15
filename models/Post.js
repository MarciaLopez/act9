const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: String,

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Superhero',
        required: true
    }
});

module.exports = mongoose.model('Post', PostSchema);