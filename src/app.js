import React from "react";
import ReactDOM from "react-dom";
import BlackjackTable from "./BlackjackTable";

/*
// Exemple game

console.log("New turn");
game.nextTurn();

console.log(game.players[0].hand);

console.log("Dealer : ");
console.log(game.dealer.hand);
console.log(game.dealer.getScore());

game.playerDraw(0);

console.log("Hand : ");
console.log(game.players[0].hand);
console.log(game.players[0].getScore());

game.dealerDraw();

console.log("Dealer : ");
console.log(game.dealer.hand);
console.log(game.dealer.getScore());

console.log(game.endTurn());*/


ReactDOM.render(
    <div id="container">
        <BlackjackTable />
    </div>,
    document.getElementById("main")
);
