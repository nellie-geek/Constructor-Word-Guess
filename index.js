var Word = require("./Word");
var inquirer = require("inquirer");
var colors = require("colors");
wordList = ["ZEUS", "ARES", "HERMES", "POSEIDON", "DIONYSUS", "APOLLO", "HELIOS", "PROMETHUS", "CRONUS", "ATLAS", "ATHENA", "ARTEMIS", "PRIAPUS"];
var choice = 0;
var chosenWord = "";
var gameWord = "";
var counter = 0;

//Game - choose and display word//
function startGame() {
    if (wordList.length) {
        wordList

    }
    choice = Math.floor(Math.random() * wordList.length);
    chosenWord = wordList[choice];
    gameWord = new Word(chosenWord);
    gameWord.makeWord();
    if (choice > -1) {
        wordList.splice(choice, 1);
    }
    console.log("\n\nYou get 10 letter guesses to spell the Ancient Greek God's name.\n\n")
    promptUser();
}

//User interaction - letter input and update guess counter
function promptUser(){
    if (counter < 10) {
        console.log(gameWord.showWord());
        inquirer.prompt([
            {
                tpye: "input",
                name: "letter",
                message: "\n\nType a letter and press enter.\n\n"
            }
        ]).then(function(data) {
            checkAnswer(data);
        });
    } else {
        console.log("\n\n Out of guesses, try again.\n\n".red);
        console.log(chosenWord);
        chosenWord = "";
        gameWord = "";
        choice = 0;
        counter = 0; 
        startGame();
    }
}

function checkAnswer(data) {
    if ((data.letter.length === 1) && /^[a-zA-Z]+$/.test(data.letter)) {
        var check = data.letter.toUpperCase();
        gameWord.checkGuess(check);
        if (!gameWord.checkWord.includes(check)) {
            console.log("\n\nINCORRECT!".red);
            // console.log("To check:"+ check);
            // console.log("This is word" + gameWord.checkWord);
            counter++ ; 
            console.log((10 - counter) + " guesses remaining");
            promptUser();
        } else {
            correctGuess();
        }
    } else {
        console.log("\n\nPlease enter a letter, one at a time.\n\n");
        promptUser();
    }
}

function correctGuess() {
    console.log("\n\nCORRECT! :)\n".green);
    if (chosenWord.replace(/ /g, "") === (gameWord.showWord()).replace(/ /g,"")) {
        console.log(gameWord.showWord());
        console.log("\n\nYou Win!\n\n".rainbow);
        chosenWord = " ";
        gameWord = " ";
        choice = 0;
        counter = 0;
        startGame();
    } else {
        promptUser();
    }
}

startGame();