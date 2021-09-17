const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/qa_test", (error)=>{
    if(!error) {
        console.log("DB Connection Success");
    } else {
        console.log("DB Connection Failed");
    }
});

const Question = require("./question.model");
const Guess = require("./guess.model");
