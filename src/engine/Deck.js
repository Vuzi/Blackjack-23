'use strict';

import Card, { cardFigures, cardTypes } from "./Card";

/**
 * Deck, containing multiples cards
 */
export default class Deck {
    constructor(size) {
        this.size = size;
        this.cardNextId = 1;

        this._refill();
    }

    getCard() {
        if(!this.hasCards())
            this._refill();

        return this.cards.pop();
    }

    hasCards() {
        return this.cards.length > 0;
    }

    _refill() {
        this.cards = [];

        // Generate each possible card
        for(var i = 0; i < this.size; i++)
            this.cards = this.cards.concat(cardTypes.reduce((acc, type) => {
                return acc.concat(cardFigures.map(figure => new Card(type, figure, this.cardNextId++)));
            }, []));

        // Shuffle cards
        this._shuffle();
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

