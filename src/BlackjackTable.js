import React from "react";
//import { NotificationStack } from 'react-notification';
import NotificationSystem from "react-notification-system";

import Deck from "./engine/Deck";
import Player from "./engine/Player";
import Game from "./engine/Game";

import PlayerZone from "./PlayerZone";

// Blackjack table
var BlackjackTable = React.createClass({
    displayName: "BlackjackTable",

    getInitialState() {
        // New game
        // Create the game engine
        return {
            game : new Game(new Deck(6), [new Player(100)]),
            notifications: []
        };
    },
    
    onBet() {
        // When multiple player, check that everybody has made a bet
        this.startTurn();
    },

    startTurn() {
        // Give cards
        this.state.game.initalDraw();

        // Refresh
        this.forceUpdate();
    },

    nextTurn() {
        // Make the dealer draw cards
        this.state.game.dealerDraw();

        // End the turn
        var results = this.state.game.endTurn();

        // Update
        this.forceUpdate();

        // Alert the user


        results.forEach(result => {

            if(result.state == "won")
                this.notification("You won (" + result.bet + ")");
            else if (result.state == "lost")
                this.notification("You lost (" + result.bet + ")");
            else if (result.state == "blackjack")
                this.notification("Blackjack ! (" + result.bet + ")");
            else
                this.notification("Equality (" + result.bet + ")");
        });

        setTimeout(() => {
            this.state.game.nextTurn();
            this.forceUpdate();
        }, 2500);
    },

    componentDidMount: function() {
        this.notificationSystem = this.refs.notificationSystem;
    },

    render() {
        const { game } = this.state;

        let playersZone = game.players.map((player, i) => {
            return (
                <PlayerZone
                    key={i}
                    type="player"
                    game={game} player={player}
                    notification={this.notification}
                    onBet={this.onBet}
                    onStand={this.nextTurn}
                    onSplit={this.forceUpdate} />
                );
        });
        
        return (
            <div>
                <PlayerZone
                    type="dealer"
                    game={game} player={game.dealer}
                    notification={this.notification} />
                {playersZone}
                <input
                    style={{
                        position: 'absolute',
                        bottom: '1px',
                        left: '15px'
                    }}
                    type="button"
                    className="button-small"
                    value="Return Menu"
                    onClick={() => {
                        window.location.replace("menu.html");
                    }}/>
                <NotificationSystem ref="notificationSystem" style={false} />
            </div>
        );
    },

    notification(message) {
        this.notificationSystem.addNotification({
            message     : message,
            level       : 'success',
            autoDismiss : 3
        });
    },

    componentWillMount() {
        // First turn
        this.state.game.nextTurn();
    }
});

export default BlackjackTable;
