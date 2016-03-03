
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
 * Player
 */
export default class Player {

    constructor(credits) {
        this.credits = credits; // Values
        this.hands = []; // List of hands. A hands is a list of cards
        this.bet = 0; // Current bet
        this.stand = false;
    }

    getScore(handIndex) {
        handIndex = handIndex === undefined ? 0 : handIndex;

        if(handIndex > this.hands.length && handIndex < 0)
            return false;

        // Get the number of spade and of the score of regular cards
        let scoreTmp = this.hands[handIndex].reduce((acc, card) => {
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

    isSplittable(handIndex){
        handIndex = handIndex === undefined ? 0 : handIndex;

        if(handPosition > this.hands.length)
            return false;

        if(this.hands.length >= 3) // 3 split maximum
            return false;

        if(this.hands[handIndex].length != 2)
            return false;

        return (this.hands[handIndex][0].figure == this.hands[handIndex][1].figure);
    }

    split(handPosition){
        handIndex = handIndex === undefined ? 0 : handIndex;
        
        if(!isSplittable(handPosition))
            return false;

        this.hands.push([this.hands[handPosition].pop()]);
    }

    canHit(handIndex) {
        handIndex = handIndex === undefined ? 0 : handIndex;
        return this.getScore(0) < 21;
    }

    isBusted(handIndex) {
        handIndex = handIndex === undefined ? 0 : handIndex;
        return this.getScore(0) > 21;
    }
}
