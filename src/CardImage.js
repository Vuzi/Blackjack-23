import React from "react";

import CardImageGenerator from "./CardImageGenerator";

// Image generator for card image
const cardImageGenerator = new CardImageGenerator('images/cards.jpg', 225, 315, ['heart', 'spade', 'diamond', 'club']);


// Image of a card, based on a card value, using the card image factory
var CardImage = React.createClass({
    render: function() {
        return cardImageGenerator.getImageFor(this.props.card);
    }
});

export default CardImage;
