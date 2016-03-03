/**
 * Created by bidau on 03/03/2016.
 */
'use strict';

const Player = require("../src/Player");
const Card = require("../src/Card");

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