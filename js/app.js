// *** VARIABLES *** //

let misses = 5;
let wordArray = '';
let b;
let p = '';
let ret = false;
const newHeart = '<img src="images/liveHeart.png" height="70px" width="60px">';
const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
// DOM variables
const phrase = document.getElementById('phrase'); // phrase text display div
const ul = phrase.firstElementChild; // ul in the above div
const divOverlay = document.getElementById('overlay'); // initial overlay div
const divWin = document.getElementById('win'); // win overlay div for end of game
const divLost = document.getElementById('lose'); // lose overlay for end of game
const divButton = divOverlay.querySelector('button'); // start button in overlay
const qwerty = document.getElementById('qwerty'); // keyboard button div for letter choice
const ol = document.getElementsByTagName('ol')[0]; // ol containing the score hearts
const heart = ol.getElementsByTagName('li');
const li =  document.getElementsByClassName('letter');
const show = document.getElementsByClassName('show');
const divKids = divOverlay.getElementsByTagName('h2');

// phrase array for guessing
const phrases = ["sasquatch","loch ness monster", "mothman", "jersey devil", "kraken", "kelpie", "mongolian death worm", "skunk ape"];


// ***** FUNCTIONS ***** //

// onload css effects
function load() {
        for (let i=0; i<divKids.length; i++) { // very silly title wheel rotation
            divKids[i].classList.add('spin');
        }
        document.getElementById('startTitle1').style.opacity = '1';
        document.getElementById('startTitle2').style.opacity = '1';
        document.getElementById('btn_start').style.opacity = '1';
        }


//random number function for phrase array (taken from MDN)
function getRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; 
}
  
//random phrase function, takes array as parameter
let getRandomPhraseAsArray = function (arr) {
    let len = arr.length; // length of phrase array is max (5)
    let phrase = arr[getRandomNumber(0,len)]; // get random number between [0] and [length] to choose phrase from array
    wordArray = [...phrase]; // split chosen phrase into array of letters
    console.log(wordArray); // returns split array for test
    return wordArray;
};

// takes the wordArray result from guessWordArray() and inserts each letter into a new <li> tag in html with new class
function addPhraseToDisplay(wordArr) {
    for (let i=0; i<wordArr.length; i++) { // loop through array length
        let list = document.createElement('li'); // new element
        list.textContent = wordArray[i]; // add letter to new element
        if (alphabet.includes(wordArr[i])) { // if wordArr[i] is a-z
            list.className = 'letter'; // add class to new element
        }
        else {
            list.className = 'noletter';
        }
        ul.appendChild(list); // append to ul in html
     }
   }

// is chosen lettter in phrase? takes arg from event listener, creates array of all <li> in <ul> and iterates
// to see if arg has class .letter adds show class if yes to display
function checkLetter (b) { //arg is clicked button, '<button class/atr>letter</button>'// all li children now an array (the phrase)
    // let li =  document.getElementsByClassName('letter');  // array of phrase letters only (no spaces)
    for (let i=0; i<li.length; i++) { //iterate through length of this new array to find b if in there
       if (b.textContent === li[i].textContent) { // if button letter same as list array letter
            li[i].className = 'letter show'; // add this class to the phrase letter to make visible
            ret = true;
            checkWin();
        } else {
            continue;
        }
    } if (ret === false) {return null;}
    ret = false;
}

// test score + misses
function checkWin() {
    if (show.length === li.length) {
        divOverlay.style.display = 'none';
        divWin.style.display = 'flex';
        divWin.firstElementChild.classList.add('spintwo');
    }
}

// // resets everything for new game
function reset() {
    // remove phrase
    const x = ul.getElementsByTagName('li');
    while (x[0]) { // make this a while loop
        ul.removeChild(x[0]);
    }
    // remove chosen class and disabled attribute from qwerty keyboard
    let chosen = document.getElementsByClassName('chosen'); // chosen letters
    while(chosen[0]) { 
        chosen[0].style.opacity = '1'; // make selected letters visible
        chosen[0].removeAttribute('disabled'); // remove stuff
        chosen[0].classList.remove('chosen');
    }
    // empty out heart list before refilling
    let heartList = document.getElementsByClassName('tries');
       while(heartList[0]) {
       heartList[0].parentNode.removeChild(heartList[0]);}
    // replace the 5 hearts
    for (let x=0; x<5; x++) {
        let newList = document.createElement('li');
        newList.classList.add('tries');
        newList.innerHTML = newHeart;
        ol.appendChild(newList);
    }
    misses = 5;
    wordArray = '';
    getRandomPhraseAsArray(phrases); //chooses the phrase from the phrase array
    addPhraseToDisplay(wordArray); // inserts in into the html
} // end reset()

// ***** EVENT LISTENERS ***** //
// 1. event listener on start button to display:none div.overlay and reveal game
divOverlay.addEventListener('click', (e) => {
    if (e.target.getElementsByTagName('BUTTON')) {
    divOverlay.style.display = 'none';
    }
});

divWin.addEventListener('click', (e) => {   // function to reset everything on win
    if (e.target.getElementsByTagName('BUTTON')) {
    divWin.style.display = 'none';
    reset();    
    }
});

divLost.addEventListener('click', (e) => {
    if (e.target.getElementsByTagName('BUTTON')) { // same function to reset everything on lose
    divLost.style.display = 'none';
    reset();
    }
});

// 2. event listener on letter button to send key choice to checkletter()
qwerty.addEventListener('click', (e) => {
    b = e.target;
    // console.log(`${b.textContent} is in ${b}`);
    if (b.tagName == 'BUTTON') {
        b.className = 'chosen'; // marks letter as chosen to change css
        b.setAttribute('disabled', true); // adds disabled attribute to keyboard letter so cannot be chosen again
        b.setAttribute('id', 'fade');
        if (checkLetter(b) === null) { // if letter not in phrase returns null ...
            ol.removeChild(heart[0]); // and removes the first heart li from the ol
            misses -= 1; // one less miss
            if (misses < 1) { // if no more misses
                divLost.style.display = 'flex'; // display lose overlay
            }
        }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
    }
});

// function calls
load();
getRandomPhraseAsArray(phrases); //chooses the phrase from the phrase array
addPhraseToDisplay(wordArray); // inserts in into the