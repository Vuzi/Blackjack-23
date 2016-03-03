'use strict';

import Card, { cardFigures, cardTypes } from "./Card";

/**
 * Deck, containing multiples cards
 */
export default class Deck {
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

