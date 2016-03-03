import React from "react";
import CardHand from "./CardHand";

// Player zone
var PlayerZone = React.createClass({
    displayName: "PlayerZone",

    getInitialState: function() {
        return { player : this.props.player };
    },

    // Ask for a new card
    hit() {
        let { game, notification } = this.props;
        
        let player = this.state.player;
        game.playerDraw(0);

        // Update
        //this.forceUpdate();

        if(player.isBusted()) {
            notification("Broken with " + player.getScore(), "broken");
            setTimeout(() => {
                this.stand();
            }, 2000);
        }
    },

    // Pass
    stand() {
        var player = this.state.player;
        player.stand = true;

        // Callback
        this.props.onStand();
    },

    render: function() {
        const player = this.state.player;

        if(this.props.type === 'dealer') {
            var score = player.stand ? player.getScore() : player.hand[0].value;
            var cards = player.stand ? player.hand : [player.hand[0]];

            if(score == 1)
                score = 11;

            return (
                <div>
                    <h3>Dealer's cards ({score}) {player.isBusted() ? " - broken !": ""}</h3>
                    <CardHand
                        className="player-cards column"
                        cards={cards} />
                </div>
            );
        } else {
            return (
                <div>
                    <h3>Player's cards ({player.getScore()}) {player.isBusted() ? " - broken !": ""}</h3>
                    <CardHand
                        className="player-cards column"
                        cards={this.state.player.hand} />
                        <div className="player-controls column">
                            <input
                                type="button"
                                disabled={player.canHit() && !player.stand ? "" : "disabled"}
                                value="Hit"
                                onClick={this.hit} />
                            <input
                                type="button"
                                className="button-outline"
                                disabled={!player.stand ? "" : "disabled"}
                                value="Stand"
                                onClick={this.stand}/>
                        </div>
                </div>
            );
        }
    }
});

export default PlayerZone;
