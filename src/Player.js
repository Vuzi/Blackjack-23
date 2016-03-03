
export function numberOfElement(array, value){
    var nb = 0;
    for(var val in array){
        if(array[val].value() == value)
            nb++;
    }
    return nb;
};

export function addCards(start, end, array, array2){
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

    isSplittable(handPosition){
        if(handPosition>this.hand.length)
            return false;
        if(this.hand.length>=2)
            return false;
        for(var i = 0; i < this.hand[handPosition].length; i++){
            if(numberOfElement(this.hand[handPosition], this.hand[handPosition][i].value)>=2){
                return true;
            }
        }
        return false;
    }

    split(handPosition){
        if(handPosition>this.hand.length)
            return;
        if(this.hand.length>=2)
            return;
        var splittableHand = this.hand[handPosition];
        this.hand.splice(handPosition, 1);
        var newHand1 = [];
        var newHand2 = [];
        var doubleCardValue;
        var i = 0;
        for(i = 0; i < splittableHand.length; i++){
            if(numberOfElement(splittableHand, splittableHand[i].value)>=2){
                doubleCardValue = splittableHand[i].value;
                break;
            }
        }
        while(i < splittableHand.length){
            if(splittableHand[i].value==doubleCardValue){
                if(newHand1.length==0)
                    newHand1.push(splittableHand[i]);
                else
                    newHand2.push(splittableHand[i]);
                splittableHand.splice(i, 1);
            }else{
                i++;
            }
        }
        newHand1 = addCards(0, splittableHand.length/2, splittableHand, newHand1);
        newHand2 = addCards(splittableHand.length/2, splittableHand.length, splittableHand, newHand2);
        this.hand.push(newHand1);
        this.hand.push(newHand2);
    }

    canHit() {
        return this.getScore() < 21;
    }

    isBusted() {
        return this.getScore() > 21;
    }
}
