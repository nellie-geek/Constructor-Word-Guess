var Word = require("./Word");
var inquirer = require("inquirer");

wordList = ["Zeus", "Ares", "Hermes", "Poseidon", "Dionysus", "Apollo", "Helios", "Prometheus", "Cronus", "Atlas", "Athena", "Artemis", "Priapus"];
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
    if (choice > 0) {
        wordList.splice(choice, 1);
    }
    console.log("\nYou get 10 letter guesses to spell the Ancient Greek God's name.\n")
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
                message: "\nType a letter and press enter.\n"
            }
        ]).then(function(data) {
            checkAnswer(data);
        });
    } else {
        console.log("\n Out of guesses, try again.\n");
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
        if (checkGuess === gameWord.showWord()) {
            console.log("\nNope, not in this name.\n");
            counter++ ; 
            console.log((10 - counter) + " guesses remaining");
            promptUser();
        } else {
            correctGuess();
        }
    } else {
        console.log("\n Please enter a letter, one at a time.");
        promptUser();
    }
}

function correctGuess() {
    console.log("\nYou guessed correctly.\n");
    if (chosenWord.replace(/ /g, "") === (gameWord.showWord()).replace(/ /g,"")) {
        console.log(gameWord.showWord());
        console.log("\nYou Win!");
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