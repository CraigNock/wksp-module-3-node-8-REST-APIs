// ... crickets...

let key = undefined;
let wordId = undefined;
let array = [];


const populate = (length) => {
    for (let i=0; i < length; i++){
        array[i] = '_';
    };
}

const update = (bools) => {
    bools.forEach(bool => {
        if (bool === true) {
            array[bools.indexOf(bool)] = key;
        }
    })
};

const startHandler = (event) => {
    event.preventDefault();
    
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

const keyHandler = (event) => {
    if (event.repeat) { return };
    key = event.keyCode;
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
    

};


//grab word from server

//build _ _ _ _ _ _ display for word

//attempt counter

//listen for keys
    //take key value and check it against word in server
        //if yes mark on board
        //if no depreciate attempt count
