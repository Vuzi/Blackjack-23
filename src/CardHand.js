import React from "react";
import CardImage from "./CardImage";

// Hand of card
var CardHand = React.createClass({
    displayName: "CardHand",
    render: function() {
        var cardImages = this.props.cards.map(card =>
            <CardImage card={card} key={card.type + card.figure} />
        );

        return (
            <div className="cards">
                {cardImages}
            </div>
        );
    }
});

export default CardHand;
