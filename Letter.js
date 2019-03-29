// Letter constructor - display word as dashes for the correct number of characters in the word//
function Letters(letter) {
    this.letter = letter,
    this.guessed = false,
    this.displayLetter = function() {
        if (this.letter === " ") {
            return " ";
        }else if(!this.guessed) {
            return "_";
        } else {
            return this.letter;
        }
    }
//function updates boolean so the letter guessed is displayed//
    this.check = function(userGuess) {
        if(userGuess === this.letter) {
            this.guessed = true;
        }
    }
}
console.log("This works.");
module.exports = Letters;