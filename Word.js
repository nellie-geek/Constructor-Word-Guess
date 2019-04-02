//dependent on letter.js 
var Letters = require("./Letter");

//Word constructor
function Word(wordArr) {
    this.wordArr = wordArr;
    this.guessWord = [];
    this.checkWord = [];
    this.makeWord = function() {
        for (var i = 0; i < wordArr.length; i++) {
            var letter = new Letters(wordArr[i]);
            this.guessWord.push(letter);
            this.checkWord.push(letter.letter);
        }
    }
    this.showWord = function() {
        var wordDis = [];
        for(var i = 0; i < this.guessWord.length; i++) {
            wordDis.push(this.guessWord[i].displayLetter());
        }
        return wordDis.join(" ");
    }
    this.checkGuess = function(userGuess) {
        for (var i = 0; i < this.guessWord.length; i++) {
            this.guessWord[i].check(userGuess);
        }
    }
}

module.exports = Word; 