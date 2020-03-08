const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    inputUrl: {
        type: String,
    },
    ShortId: {
        type: String
    }
});

const Url = mongoose.model('Url', urlSchema);

exports.Url = Url;