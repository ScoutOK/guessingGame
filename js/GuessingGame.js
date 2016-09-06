var generateWinningNumber = function () {
	return Math.floor(100 * Math.random()) + 1;
}

var shuffle = function (array) {
	var m = array.length, t, i;

  	// While there remain elements to shuffle…
  	while (m) {
    i = Math.floor(Math.random() * m--);
    //store last unshuffled element in t
    t = array[m];
    //assign the value selected to that spot
    array[m] = array[i];
    //put the value t where the selected value was previously
    array[i] = t;
  }
	return array;
}

var Game = function () {
	this.playersGuess = null;
	this.pastGuesses = [];
	this.winningNumber = generateWinningNumber();
}

Game.prototype.difference = function () {
	return Math.abs(this.playersGuess - this.winningNumber);
}

Game.prototype.isLower = function () {
	return this.playersGuess < this.winningNumber;
}

Game.prototype.playersGuessSubmission = function (input) {
	if(typeof input == 'number' && input > 0 && input <= 100) {
		this.playersGuess = input;
		return this.checkGuess();
	} else {
		throw "That is an invalid guess.";
	}
}

Game.prototype.checkGuess = function () {
	//if guess is correct
	if (this.playersGuess == this.winningNumber) {
		return 'You Win!';
	}
	//check if the guess has been made
	if (this.pastGuesses.indexOf(this.playersGuess) != -1) {
		return "You have already guessed that number.";
	}
	//if last allowed guess
	this.pastGuesses.push(this.playersGuess);
	if(this.pastGuesses.length == 5) {
		return "You Lose.";
	}
	//hints based on distance from correct number
	if(this.difference() < 10) {
		return "You\'re burning up!";
	}
	if(this.difference() < 25) {
		return "You\'re lukewarm.";
	}
	if(this.difference() < 50) {
		return "You\'re a bit chilly.";
	}
	if(this.difference() < 100) {
		return "You\'re ice cold!";
	}
}

var newGame = function () {
	return new Game();
}

Game.prototype.provideHint = function () {
	var hints = [this.winningNumber, generateWinningNumber(), generateWinningNumber()];
	shuffle(hints);
	return hints;
}