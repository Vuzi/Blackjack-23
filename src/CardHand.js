import React from "react";

import CardImage from "./CardImage";

// Hand of card
var CardHand = React.createClass({
    displayName: "CardHand",

    // Ask for a new card
    hit() {
        let { game, player, hand, notification } = this.props;

        game.playerDraw(player, hand);

        // Update
        this.forceUpdate();

        if(hand.isBusted()) {
            notification("Hand broken with " + hand.getScore());
            setTimeout(() => {
                this.stand();
            }, 2000);
        }
    },

    // Pass
    stand() {
        let hand = this.props.hand;

        hand.stand = true;

        // Callback
        this.props.onStand();
    },

    render() {
        const { player, hand, type } = this.props;

        const cardImages = this.props.hand.cards.map(card =>
            <CardImage card={card} key={card.type + card.figure} />
        );

        const controls = type === "player" ? (
            <div>
                <div className="player-controls column">
                    <input
                        type="button"
                        disabled={hand.canHit() && !hand.stand ? "" : "disabled"}
                        value="Hit"
                        onClick={this.hit} />
                    <input
                        type="button"
                        className="button-outline"
                        disabled={!hand.stand ? "" : "disabled"}
                        value="Stand"
                        onClick={this.stand}/>
                </div>
            </div>
        ) : null;

        return (
            <div className="hand">
                <h3>({hand.getScore()})</h3>
                <div className="cards">
                    {cardImages}
                </div>
                {controls}
            </div>
        );
}
});

export default CardHand;
