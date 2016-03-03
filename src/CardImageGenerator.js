import React from "react";
import { cardFigures } from "./Card";

//Card factory, used to configure how card image are generated
export default class CardImageGenerator {
    constructor(image, cardWidth, cardHeight, lineOrder) {
        this.image = image;
        this.cardWidth = cardWidth;
        this.cardHeight = cardHeight;
        this.lineOrder = lineOrder || cardTypes;
    }

    getImageFor(card) {
        var xPos = this.lineOrder.indexOf(card.type) * this.cardHeight;
        var yPos = cardFigures.indexOf(card.figure) * this.cardWidth;

        var cardStyle = {
          backgroundImage: 'url(' + this.image + ')',
          backgroundPosition: '-' + yPos + 'px -' + xPos + 'px',
          width : this.cardWidth,
          height : this.cardHeight
        };

        return (
            <div className="card" style={cardStyle} />
        );
    }
}
