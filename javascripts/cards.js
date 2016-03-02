'use strict';

const cardTypes = [
	"diamond",
	"spade",
	"club",
	"heart"
]

const cardFigures = [
	"1", "2", "3", "4", "5", "6", "7", "8", "9", "X",
	"J", "Q", "K"
]

/**
 * Card of the deck
 */
class Card {
	constructor(type, figure) {
		this.type = type;
		this.figure = figure;
	}

	value() {
        var i = cardFigures.indexOf(this.figure);

	    else if(i < 10) // Value
	        return i + 1;
	    else // Figure
	        return 10
	}
}

/**
 * Deck, containing multiples cards
 */
class Deck {
	constructor() {
		// Generate each possible card
		this.cards = cardTypes.reduce((acc, type) => {
			return acc.concat(cardFigures.map((figure) => {
				return new Card(type, figure);
			}));
		}, []);

		// Shuffle cards
		this._shuffle();
	}

	getCard() {
		return this.cards.pop();
	}

	hasCards() {
		return this.cards.length > 0;
	}

	_shuffle() {
	    let counter = this.cards.length;

	    // While there are cards
	    while (counter > 0) {
	        // Pick a random index
	        let index = Math.floor(Math.random() * counter);

	        // Decrease counter by 1
	        counter--;

	        // And swap the last element with it
	        let temp = this.cards[counter];
	        this.cards[counter] = this.cards[index];
	        this.cards[index] = temp;
	    }
	}
}

