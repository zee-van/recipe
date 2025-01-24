const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/projectRecipe');

const userSchema = mongoose.Schema({
    role: {type: String, default: 'recipeMaker'},
    username: { type: String },
    email: { type: String },
    password: { type: String },
    conformPassword: { type: String },
    profilePic: {
        type: Buffer,
    },
    date: {
        type: Date,
        default: Date.now
    },
    userRecipes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'recipe'
        }
    ],
})

module.exports = mongoose.model('recipeMaker', userSchema);

