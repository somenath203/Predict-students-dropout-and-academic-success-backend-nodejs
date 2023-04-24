const mongoose = require('mongoose');

const userPredResult = new mongoose.Schema({
    predResult: {
        type: String
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'users'
    }
}, {
    timestamps: true
});


module.exports = mongoose.model('predictions', userPredResult);