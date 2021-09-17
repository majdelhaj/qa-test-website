var mongoose = require('mongoose');

var questionSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: "Required"
    },
    question: {
        type: String,
        required: "Required"
    },
    humanAnswer: {
        type: String,
        required: "Required"
    },
    botAnswer: {
        type: String,
        required: "Required"
    },
    f1Score: {
        type: Number,
    }
});

mongoose.model("Question", questionSchema);