const mongoose = require('mongoose');


const recipeSchema = mongoose.Schema({
    recipeName: { type: String },
    image: {
        type: Buffer
    },
    steps: [
        {
            stepNo: { type: Number },
            instruction: { type: String },
        },
    ],
    description: { type: String },
    mealType: { type: String },
    ingredients: [
        {
            type: String
        }
    ],
    recipeMaker: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'recipeMaker'
    },
    date: {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model('recipe', recipeSchema);
