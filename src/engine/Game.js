'use strict';

import Player, { PlayerHand } from "./Player";
import Card, { cardFigures, cardTypes } from "./Card";

/**
 * Game engine
 */
export default class Game {

    constructor(deck, players) {
        this.deck = deck;             // List of decks to use
        this.players = players;       // List of players
        this.dealer = new Player(0);  // The dealer
    }

    /**
     * Start a new turn, and delete hands
     */
    nextTurn() {
        // For every player
        this.players.forEach((player) => {
            // Reset hand
            player.hands = [ new PlayerHand() ];
            player.stand = false;
        });

        // Reset dealer
        this.dealer.hands = [ new PlayerHand() ];
        this.dealer.stand = false;
    }

    /**
     * Place a bet for the given player to his given hand. The bet should be placed before any card is
     * in the player's hand, and be less or equals to the remaining credits of the player.
     */
    placeBet(player, hand, amount) {
        if(amount < 0 || amount > player.credits || hand.hasCard())
            return false;

        hand.bet = amount;
        player.credits -= amount;

        return true;
    }

    /**
     * Give to the player and to the dealer two new cards
     */
    initalDraw() {
        var i = 10000;
        // For every player
        this.players.forEach((player) => {
            // Give 2 cards
            //for(var i = 0; i < 2; i++)
            //    player.hands[0].addCard(this.deck.getCard());

            var card = this.deck.getCard();
            var card2 = new Card(card.type, card.figure, i++)

            player.hands[0].addCard(card);
            player.hands[0].addCard(card2);
        });

        // Give 2 cards
        for(var i = 0; i < 2; i++)
            this.dealer.hands[0].addCard(this.deck.getCard());
    }

    /**
     * Make the specified player draw a card from the game's deck
     */
    playerDraw(player, hand) {
        hand.addCard(this.deck.getCard());
        if (hand.isBusted())
            hand.stand = true;
    }

    /**
     * Split the specified player hand
     */
    playerSplit(player, hand) {
        if(hand.isSplittable() && player.credits >= hand.bet) {
            // Create the hand
            let newHand = hand.split();

            // Set the credits
            player.credits -= hand.bet;
            newHand.bet = hand.bet;

            // Add the end
            player.hands.push(newHand);
        }

        console.log(player.hands)
    }

    /**
     * Return true if all the player have stand, meaning that the turn can be ended
     */
    haveAllPlayerStand() {
        return this.players.filter((player) => !player.hasStand()).length != 0;
    }

    /**
     * Make the dealer draw cards until reaching at least 17
     */
    dealerDraw() {
        // The dealer need to get card until 17
        while(this.dealer.hands[0].getScore() < 17)
            this.dealer.hands[0].addCard(this.deck.getCard());

        this.dealer.stand = true;
    }

    /**
     * Stop the current turn, and return the status of the turn, for each player
     */
    endTurn() {
        // Get who won or lost
        let res = this.players.reduce((acc, player) => {
            return player.hands.reduce((acc, hand) => {
                if(hand.isBusted() || (!this.dealer.hands[0].isBusted() && hand.getScore() < this.dealer.hands[0].getScore())) {
                    acc.push("lost");
                } else if(this.dealer.hands[0].isBusted() || hand.getScore() > this.dealer.hands[0].getScore()) {
                    acc.push("won");

                    if(hand.cards.length == 2 && hand.getScore() == 21)
                        player.credits += Math.round(hand.bet * 2.5); // Blackjack
                    else
                        player.credits += hand.bet * 2;
                } else {
                    acc.push("equality");
                    player.credits += hand.bet;
                }
                return acc;
            }, []);
            return acc;
        }, []);

        return res;
    }
}
