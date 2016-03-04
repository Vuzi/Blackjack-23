export const cardFigures = [
    "1", "2", "3", "4", "5", "6", "7", "8", "9", "X",
    "J", "Q", "K"
];

export const cardTypes = [
    "diamond",
    "spade",
    "club",
    "heart"
]

/**
 * Card of the deck
 */
export default class Card {
    constructor(type, figure, id) {
        this.type = type;
        this.figure = figure;
        this.id = id;
    }

    get value() {
        var i = cardFigures.indexOf(this.figure);

        if(i < 10) // Value
            return i + 1;
        else // Figure
            return 10
    }
}
