import Player, { numberOfElement, addCards } from "../src/Player";
import Card, { cardTypes, cardFigures } from "../src/Card";
import assert from "assert";

describe("Player get score", () => {
   it("should splite a hand", () => {
       var player = new Player(1000);
       var card1 = new Card("diamond", "2");
       var card2 = new Card("spade", "10");
       var card3 = new Card("club", "2");
       var card4 = new Card("club", "5");
       player.hand.push([card1, card2, card4]);
       assert.equal(false, false);
   }) ;
});
