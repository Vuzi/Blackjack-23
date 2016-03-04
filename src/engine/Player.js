
export class PlayerHand {

    constructor() {
        this.cards = []; // List of hands. A hands is a list of cards
        this.bet = 0; // Current bet
        this.stand = false;
    }

    addCard(card) {
        this.cards.push(card);
    }

    hasCard() {
        return this.cards.length > 0;
    }

    getScore() {
        // Get the number of spade and of the score of regular cards
        let scoreTmp = this.cards.reduce((acc, card) => {
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

    isBlackJack() {
        return (this.cards.length == 2) && (this.getScore() == 21);
    }

    isDoublable() {
        return this.cards.length === 2;
    }

    isSplittable() {
        if(this.cards.length != 2)
            return false;

        return (this.cards[0].figure == this.cards[1].figure);
    }

    canHit() {
        return this.getScore(0) < 21;
    }

    isBusted() {
        return this.getScore(0) > 21;
    }

    split() {
        if(this.isSplittable()) {
            let newHand = new PlayerHand();
            newHand.addCard(this.cards.pop());
            return newHand;
        }

        return null; // Nothing to split
    }
}

/**
 * Player
 */
export default class Player {

    constructor(credits) {
        this.credits = credits; // Values
        this.hands = []; // List of hands. A hands is a list of cards
    }

    /**
     * Return true if the current player have no more hands to play with,
     * i.e. that all his hand are "stand"
     */
    hasStand() {
        return this.hands.filter((hand) => !hand.stand).length != 0;
    }
}
