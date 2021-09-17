var express = require('express');
const mongoose = require("mongoose");
const {use} = require("express/lib/router");
var router = express.Router();

const Question = mongoose.model("Question");
const Guess = mongoose.model("Guess");

router.get('/', function(req, res, next) {
    res.render('questions', { title: 'Turing Test' });
});

router.post('/', function (req, res, next) {


    let question = new Question();
    question.id = 3
    question.question = "هل يجوز اهداء النصارى الهدايا؟";
    question.humanAnswer = "مستحب";
    question.botAnswer = "نعم يجوز";
    question.f1Score = 0;
    question.save();
});

router.get('/random', async function (req, res, next) {

    /**/


    let pastQuestions = req.query.pastQuestions;

    let question = null;

    let count = await Question.count({"id": {"$nin": pastQuestions}}).exec();

    if (count > 0) {
        // Get a random entry
        var random = Math.floor(Math.random() * count)

        question = await Question.findOne({"id": {"$nin": pastQuestions}}).skip(random).exec();

        let q = {
            id: question.id,
            question: question.question,
            answer: (Math.floor(Math.random() * 100) % 2 == 0) ? question.humanAnswer : question.botAnswer
        };
        //
        res.send({question: q});
    } else {
        res.send({question: null});
    }
});

router.post('/guess', async function (req, res, next) {

    let guessData = req.body;
    let question = await Question.findOne({"id": guessData['question[id]']}).exec();

    if (question) {
        let guess = new Guess();
        guess.questionId = question.id;
        guess.showAnswer = (guessData['question[answer]'] === question.humanAnswer)? "human" : "bot";
        guess.userAnswer = guessData.guess;
        guess.userIP = req.headers['x-forwarded-for'] || req.socket.remoteAddress || null;;
        guess.createdAt = Date.now();

        guess.save();
    }


    res.send({success: true});
});

module.exports = router;
