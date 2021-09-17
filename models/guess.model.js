var mongoose = require('mongoose');

var guessSchema = new mongoose.Schema({
    questionId: {
        type: Number,
        required: "Required"
    },
    showAnswer: {
        type: String,
        required: "Required"
    },
    userAnswer: {
        type: String,
        required: "Required"
    },
    userIP: {
        type: String,
    },
    createdAt: {
        type: Date,
        required: "Required"
    }
});

mongoose.model("Guess", guessSchema);