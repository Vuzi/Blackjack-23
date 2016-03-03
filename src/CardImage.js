import React from "react";
import CardImageGenerator from "./CardImageGenerator";

// Image generator for card image
const cardImageGenerator = new CardImageGenerator('images/cards.png', 167.5384615384615 , 243.2, ['club', 'diamond', 'heart', 'spade']);


// Image of a card, based on a card value, using the card image factory
var CardImage = React.createClass({
    render: function() {
        return cardImageGenerator.getImageFor(this.props.card);
    }
});

export default CardImage;
