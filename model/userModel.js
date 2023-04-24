const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema({
    fullname: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    }
}, {
    timestamps: true 
});


userSchema.pre('save', async function() {

    const salt = await bcrypt.genSalt(10);

    this.password = await bcrypt.hash(this.password, salt);

});

userSchema.methods.comparePassword = async function(passEnteredbyTheUser) {

    const isMatch = await bcrypt.compare(passEnteredbyTheUser, this.password);

    return isMatch;
    
};

userSchema.methods.generateToken = function() {

    return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.EXPIRES_IN });
    
}


module.exports = mongoose.model('users', userSchema);