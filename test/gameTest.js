/**
 * Created by bidau on 03/03/2016.
 */
'use strict';

var assert = require("assert");

var numberOfElement = function(array, value){
    var nb = 0;
    for(var val in array){
        if(array[val].value == value)
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
}

const cardTypes = [
    "diamond",
    "spade",
    "club",
    "heart"
];

const cardFigures = [
    "1", "2", "3", "4", "5", "6", "7", "8", "9", "X",
    "J", "Q", "K"
];


class Card {
    constructor(type, figure) {
        this.type = type;
        this.figure = figure;
    }

    get value() {
        var i = cardFigures.indexOf(this.figure);

        if(i < 10) // Value
            return i + 1;
        else // Figure
            return 10
    }
}



/*
describe("array", function(){
   it("should return the number of element", function(){
        assert.equal(2, numberOfElement([2, 3, 2], 2));
   }) ;
});
*/

describe("splite", function(){
   it("should splite a hand", function(){
       var player = new Player(1000);
       var card1 = new Card("diamond", "2");
       var card2 = new Card("spade", "10");
       var card3 = new Card("club", "2");
       var card4 = new Card("club", "5");
       player.hand.push([card1, card2, card4]);
       assert.equal(false, player.isSplittable(0));
       //player.split(0);
       console.log(player.hand);
   }) ;
});