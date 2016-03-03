'use strict';

/**
 * Player
 */
class Player {

	constructor(credits) {
		this.credits = credits; // Values
		this.hand = []; // List of hands. A hands is a list of cards
		this.bet = 0; // Current bet
		this.stand = false;
	}

	getScore() {
		// Get the number of spade and of the score of regular cards
        let scoreTmp = this.hand.reduce((acc, card) => {
            let val = card.value;

            if(val == 1)
                return [acc[0] + 1, acc[1]];
            else
                return [acc[0], acc[1] + val];
        }, [0, 0]);

        var score = null;

        // As long as possible, set spade value to 11
        for(var i = 1; i <= scoreTmp[0]; i++) {
            var test = i * 11 + scoreTmp[0] - i;

            if(test + scoreTmp[1] <= 21)
                score = test + scoreTmp[1];
            else
            	break;
        }

        // Return the computed score
        return score ? score : scoreTmp[0] + scoreTmp[1];
	}

	canHit() {
		return this.getScore() < 21;
	}

	isBusted() {
		return this.getScore() > 21;
	}
}

/**
 * Game engine
 */
class Game {

	constructor(deck, players) {
		this.deck = deck;            // List of decks to use
		this.players = players;      // List of players
		this.dealer = new Player(0); // The dealer
	}

	/**
	 * Start a new turn, and give to the player and to the dealer two new cards
	 */
	nextTurn() {
		// For every player
        this.players.forEach((player) => {
            // Reset hand
            player.stand = false;
            player.hand = [];
            player.bet = 0;

			// Give 2 cards
        	for(var i = 0; i < 2; i++)
            	player.hand.push(this.deck.getCard());
        })

        // Reset dealer
        this.dealer.stand = false;
        this.dealer.hand = [];

		// Give 2 cards
    	for(var i = 0; i < 2; i++)
        	this.dealer.hand.push(this.deck.getCard());
	}

	/**
	 * Make the specified player draw a card from the game's deck, and return the score
	 */
	playerDraw(playerIndex) {
		this.players[playerIndex].hand.push(this.deck.getCard());
		if (this.players[playerIndex].isBusted())
			this.players[playerIndex].stand = true;
	}

	/**
	 * Make the dealer draw cards until reaching at least 17
	 */
	dealerDraw() {
		// The dealer need to get card until 17
		while(this.dealer.getScore() < 17)
        	this.dealer.hand.push(this.deck.getCard());
		
		this.dealer.stand = true;
	}

	/**
	 * Stop the current turn, and return the status of the turn, for each player
	 */
	endTurn() {
		// Get who won or lost
        let res = this.players.reduce((acc, player) => {
        	if(player.isBusted() || (!this.dealer.isBusted() && player.getScore() < this.dealer.getScore())) {
            	acc.push("lost");
            	player.credits -= player.bet;
        	} else if(this.dealer.isBusted() || player.getScore() > this.dealer.getScore()) {
            	acc.push("won");
            	player.credits += player.bet;
        	} else {
            	acc.push("equality");
        	}

            return acc;
        }, []);

        return res;
	}
}

