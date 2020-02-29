'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const PORT = process.env.PORT || 8000;

const {wordList} = require('./wordlist');

const randy = (min, max) => {
    let rand = Math.floor((Math.random()*(max - min)) + min);
    return rand;
};

const wordHandler = (req, res) => {
    let index = randy(0, wordList.length)
    let word = wordList[index];
    console.log(word);
    word = {id: word.id, length: word.length};
    res.status(200).send(word);
};

const guessHandler = (req, res) => {
    let id = req.params.wordId;
    let letter = req.params.letter;
    let word = wordList[id - 1].word;
    // console.log(id, letter, word);

    let truth = []
    for (let i=0; i < word.length; i++){
        truth[i] = false;
    };
    for (let i=0 ; i < word.length ; i++){
        if(word[i] === letter){
            truth[i] = true;
        }
    }
    // console.log(truth);
    res.status(200).send({
        status: '200',
        truth: truth
    });
};



express()
    .use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    })
	.use(morgan('tiny'))
	.use(express.static('public'))
    .use(bodyParser.json())
    .use(express.urlencoded({extended: false}))

    // endpoints
    .get('/', (req, res) => {
        res.redirect('/hangman')
    })

    .get('/hangman/words', wordHandler)

    .get('/hangman/guess/:wordId/:letter', guessHandler)

    .listen(PORT, () => console.log(`Listening on port ${PORT}`));