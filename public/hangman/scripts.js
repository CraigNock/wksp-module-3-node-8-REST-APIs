
let key = undefined;
let wordId = undefined;
let array = [];
let attempts = 0;

const wordSpace = document.getElementById('wordSpace');
const attemptSpan = document.getElementById('attempts');
const guessSpan = document.getElementById('guesses');
const notLetter = document.getElementById('notLet');

const dogs = document.querySelector('.dog');
const pie = document.querySelector('.pie');
const eatpie = document.querySelector('.nopie');

//clears the game for fresh play
const clearGame = () => {
    document.querySelector(`.d${attempts}`).style.color = 'black';
    pie.style.display = 'block';
    eatpie.style.display = 'none';
    attempts = 0;
    attemptSpan.innerText = attempts;
    guessSpan.innerText = '';
}

//gets word and starts game
const startHandler = (event) => {
    event.preventDefault();
    clearGame();
    
    fetch('/hangman/words')
    .then(word => word.json())
    .then(word => {
        console.log(word);
        wordId = word.id;
        console.log(wordId);
        populate(word.length);
        console.log(array);
    });
    document.addEventListener('keydown', keyHandler);
};

//populates inital word view
const populate = (length) => {
    array = [];
    for (let i=0; i < length; i++){
        array[i] = '_';
    };
    wordSpace.innerText = array.join(' ');
}

//receives and checks guess
const keyHandler = (event) => {
    if (event.repeat) { return };
    key = event.keyCode;
    //checks input to make sure is a letter
    if (key > 64 && key <91 || key > 96 && key <122) {
        notLetter.style.display = 'none';
        key = String.fromCharCode(key);
        key = key.toLowerCase();
        // console.log(key);
        fetch(`/hangman/guess/${wordId}/${key}`)
            .then(data=> data.json())
            .then(data => {
                // console.log(data.truth);
                update(data.truth);
                // console.log(array);
            });
    } else {
        notLetter.style.display = 'block';
    };
};

//update wordview
const update = (bools) => {
    if (bools.every(i => i === false)){
        attempts++; 
        attemptSpan.innerText = attempts;
        guessSpan.innerText = `${guessSpan.innerText} ${key}`;
        dogSwitch();
    } else {
        for (let i=0 ; i < bools.length ; i++){
            if(bools[i] === true){
                array[i] = key;
            }
        }
        wordSpace.innerText = array.join(' ');
    };
    if (attempts >= 5) {
        document.removeEventListener('keydown', keyHandler);
        console.log('sol');
    };
};

//"animates" dog
const dogSwitch = () => {
    if (attempts < 5){
        document.querySelector(`.d${attempts-1}`).style.color = 'black';
        document.querySelector(`.d${attempts}`).style.color = 'beige';
    } else if (attempts === 5) {
        document.querySelector(`.d${attempts-1}`).style.color = 'black';
        pie.style.display = 'none';
        eatpie.style.display = 'block';
    };
}


