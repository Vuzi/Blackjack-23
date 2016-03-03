
/**
 * Player
 */
export default class Player {

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
