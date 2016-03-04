import React from "react";

import CardHand from "./CardHand";

// Player zone
var PlayerZone = React.createClass({
    displayName: "PlayerZone",

    getInitialState() {
        return { hasBet : this.props.hasBet || false, bet : 10 };
    },

    changeBet(e) {
        let value = parseInt(e.target.value);

        if(!isNaN(value))
            this.setBet(value);
        else
            this.setState({ bet : this.state.bet });
    },

    incBet(e) {
        this.setBet(this.state.bet + 10);
    },

    decBet(e) {
        this.setBet(this.state.bet - 10);
    },

    setBet(bet) {
        let player = this.props.player;

        if(bet > player.credits)
            bet = player.credits;
        else if(bet < 0)
            bet = 0;

        this.setState({ bet : bet });
    },

    validateBet(e) {
        let { game, player } = this.props;

        // Place the bet on the first hand
        game.placeBet(player, player.hands[0], this.state.bet);

        this.setState({ hasBet : true });
        this.props.onBet();
    },

    onStand() {
        // Revert : no bet done
        setTimeout(() => {
            this.setState({ hasBet : false });
        }, 2400);

        // Call the previous action
        this.props.onStand();
    },
    
    render: function() {
        const {game, player} = this.props;

        // Get all the player hands
        const hands = player.hands.map((hand) => {
            return ( 
                <CardHand
                    className="player-cards column"
                    {...this.props}
                    onStand={this.onStand}
                    hand={hand}
                />
            );
        });

        return (
            <div className="hands">
                {this.props.type === 'dealer' ? (
                    <h3>Dealer's cards</h3>
                ) : (
                    <h3>Player's cards</h3>
                )}
                {this.state.hasBet || this.props.type === 'dealer' ? (
                    <div>
                        {hands}
                    </div>
                ) : (
                    <div className="bet">
                        <div className="row">
                            <input type="button" className="button-small button-outline" onClick={this.decBet} value="-" />
                            <input type="text" value={this.state.bet} onChange={this.changeBet} />
                            <input type="button" className="button-small button-outline" onClick={this.incBet} value="+" />
                        </div>
                        <div className="row">
                            <input type="button" className="button-small button" value="Place bet" onClick={this.validateBet} />
                        </div>
                    </div>
                )}
                <div className="credits">
                    {player.credits} credit(s)
                </div>
            </div>
        );
    }
});

export default PlayerZone;
