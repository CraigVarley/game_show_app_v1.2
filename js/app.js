// *** VARIABLES *** //

let missed = 0;
let wordArray = '';
let letterFound;
let b, p;
const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
// DOM variables
const phrase = document.getElementById('phrase'); // phrase text display div
const ul = phrase.firstElementChild; // ul in the above div
const divOverlay = document.getElementById('overlay'); // initial overlay div
const divButton = divOverlay.querySelector('button'); // start button in overlay
const qwerty = document.getElementById('qwerty'); // keyboard button div for lettter choice
// phrase array for guessing
const phrases = ["jaws","wizard of oz","yojimbo","my neighbour totoro","the life aquatic"];


// ***** EVENT LISTENERS ***** //

// event listener on start button to display:none div.overlay and reveal game
divOverlay.addEventListener('click', (e) => {
    if (e.target.tagName == 'BUTTON') {
    divOverlay.style.display = 'none';
    }
});

// event listener on letter button to send key choice to checkletter()
qwerty.addEventListener('click', (e) => {
    b = e.target;
    // console.log(`${b.textContent} is in ${b}`);
    if (b.tagName == 'BUTTON') {
        b.className = 'chosen'; // marks letter as chosen to change css
        b.setAttribute('disabled', true); // adds disabled attribute to keyboard letter so cannot be chosen again
        // goood up to here !!
        checkLetter(b); // runs checkLetter(e.target) which is selected button ... see below
        letterFound += b.textContent; // the letter
        //console.log(letterFound)
        // b = '';
    }
});


// ***** FUNCTIONS ***** //

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
        ul.appendChild(list); // append to ul in html
     }
   }



// is chosen lettter in phrase? takes arg from event listener, creates array of all <li> in <ul> and iterates
// to see if arg has class .letter adds show class if yes to display
function checkLetter (b) { //arg is clicked button, '<button class/atr>letter</button>'// all li children now an array (the phrase)
    console.log(b.textContent);
    let li =  document.getElementsByClassName('letter');  // array of phrase letters only (no spaces) for some reason
    for (let i=0; i<li.length; i++) { //iterate through length of this new array to find b if in there
       if (b.textContent === li[i].textContent) { // if button letter same as list array letter
            li[i].className = 'letter show'; // add this class to the phrase letter to make visible
            p += li[i]; // add correct letter to the variable
            return p;
            break;
        } else {
            continue;
        }
    }
    missed += 1;
    console.log(`You have missed: ${missed}`);
}


// call functions
getRandomPhraseAsArray(phrases); //chooses the phrase from the phrase array
addPhraseToDisplay(wordArray); // inserts in into the html