import React, { Component } from "react";
import PlayerZone from "./PlayerZone";
import Deck from "./Deck";
import Player from "./Player";
import Game from "./Game";
import { NotificationStack } from 'react-notification';
import { Container } from "flux/utils";
import AppStore from "./AppStore";
import { nextTurn, addNotification, deleteNotification } from "./Actions";

class BlackjackTable extends Component {
    static getStores() {
        return [AppStore];
    }

    static calculateState(/*prevState*/) {
        return AppStore.getState();
    }

    constructor(props) {
        super();
        this.nextTurn = this.nextTurn.bind(this);
    }

    nextTurn() {
        // Make the dealer draw cards
        this.state.game.dealerDraw();

        // End the turn
        var results = this.state.game.endTurn();

        // Update
        this.forceUpdate();

        // Alert the user
        if(results[0] == "won")
            addNotification("You won :)");
        else if (results[0] == "lost")
            addNotification("You lost :(");
        else
            addNotification("Equality :S");

        setTimeout(() => {
            nextTurn();
            this.forceUpdate();
        }, 2500);
    }

    render() {
        const { game, notifications } = this.state;
        console.log("BlackjackTable state", this.state);
        
        return (
            <div>
                <PlayerZone
                    type="dealer"
                    player={game.dealer}
                    game={game} />
                <PlayerZone
                    type="player"
                    player={game.players[0]}
                    game={game}
                    onStand={() => this.nextTurn() } />
                <NotificationStack
                    notifications={this.state.notifications}
                    onDismiss={deleteNotification}
                />
            </div>
        );
    }

    componentWillMount () {
        nextTurn();
    }
}

export default Container.create(BlackjackTable);
