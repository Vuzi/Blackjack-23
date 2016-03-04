import React from "react";

import CardImageGenerator from "./CardImageGenerator";

// Image generator for card image
const cardImageGenerator = new CardImageGenerator('images/cards.png', 'images/back.png', 167 ,243, ['club', 'diamond', 'heart', 'spade']);


// Image of a card, based on a card value, using the card image factory
var CardImage = React.createClass({
    render: function() {
    	if(!this.cachedImage) {
    		if(this.props.card)
    			this.cachedImage = cardImageGenerator.getImageFor(this.props.card);
    		else
    			this.cachedImage = cardImageGenerator.getBackImage();
    	}

        return this.cachedImage;
    }
});

export default CardImage;
