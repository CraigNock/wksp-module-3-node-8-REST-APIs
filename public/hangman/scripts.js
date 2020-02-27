// ... crickets...

let key = undefined;
let wordId = undefined;
let array = [];
let attempts = 0;

const wordSpace = document.getElementById('wordSpace');
const attemptSpan = document.getElementById('attempts');
const guessSpan = document.getElementById('guesses');

const dogs = document.querySelector('.dog');
const pie = document.querySelector('.pie');
const eatpie = document.querySelector('.nopie');

//"animates" dog
const dogSwitch = () => {
    if (attempts < 5){
        // dogs.style.color = 'black';
        document.querySelector(`.d${attempts-1}`).style.color = 'black';
        document.querySelector(`.d${attempts}`).style.color = 'beige';
    } else if (attempts === 5) {
        document.querySelector(`.d${attempts-1}`).style.color = 'black';
        pie.style.display = 'none';
        eatpie.style.display = 'block';
    };
}


//gets word and starts game
const startHandler = (event) => {
    event.preventDefault();
    //make function to reset board
    attempts = 0;
    attemptSpan.innerText = attempts;
    guessSpan.innerText = '';

    fetch('/hangman/words')
    .then(word => word.json())
    .then(word => {
        console.log(word);
        wordId = word.id;
        console.log(wordId);
        populate(word.length);
        console.log(array);
    })
    
    document.addEventListener('keydown', keyHandler);
};

//populates inital word view
const populate = (length) => {
    array = [];
    for (let i=0; i < length; i++){
        array[i] = '_';
    };
    wordSpace.innerText = array;
}

//receives and checks guess
const keyHandler = (event) => {
    if (event.repeat) { return };
    key = event.keyCode;
    //checks input to make sure is a letter
    if (key > 64 && key <91 || key > 96 && key <122) {
        key = String.fromCharCode(key);
        key = key.toLowerCase();
        console.log(key);

        fetch(`/hangman/guess/${wordId}/${key}`)
            .then(data=> data.json())
            .then(data => {
                console.log(data.truth);
                update(data.truth);
                console.log(array);
            });
    } else {
        console.log('not a letter');
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
        wordSpace.innerText = array;
    };
    if (attempts >= 5) {
        document.removeEventListener('keydown', keyHandler);
        console.log('sol');
    };
};




//grab word from server

//build _ _ _ _ _ _ display for word

//attempt counter

//listen for keys
    //take key value and check it against word in server
        //if yes mark on board
        //if no depreciate attempt count
