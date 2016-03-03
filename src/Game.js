'use strict';

import Player from "./Player";

var numberOfElement = function(array, value){
    var nb = 0;
    for(var val in array){
        if(array[val].value() == value)
            nb++;
    }
    return nb;
};

var addCards = function(start, end, array, array2){

    for(var i = start; i < end; i++){
        array2.push(array[i]);
    }
    return array2;
};

/**
 * Game engine
 */
export default class Game {

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
