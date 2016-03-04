import React from "react";

import { cardFigures } from "./engine/Card";

// Card factory, used to configure how card image are generated
export default class CardImageGenerator {
    constructor(image, backImage, cardWidth, cardHeight, lineOrder) {
        this.image = image;
        this.backImage = backImage;
        this.cardWidth = cardWidth;
        this.cardHeight = cardHeight;
        this.lineOrder = lineOrder || cardTypes;
    }

    _getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }

    getBackImage() {
        var cardStyle = {
          backgroundImage: 'url(' + this.backImage + ')',
          backgroundPosition: '0px 0px',
          width : this.cardWidth,
          height : this.cardHeight,
          marginLeft: this._getRandomInt(-33, -15),
          animationName: 'cardAnimation' + this._getRandomInt(1, 6)
        };

        return (
            <div className="card" style={cardStyle} />
        );
    }

    getImageFor(card) {
        var xPos = this.lineOrder.indexOf(card.type) * this.cardHeight;
        var yPos = cardFigures.indexOf(card.figure) * this.cardWidth;

        var cardStyle = {
          backgroundImage: 'url(' + this.image + ')',
          backgroundPosition: '-' + yPos + 'px -' + xPos + 'px',
          width : this.cardWidth,
          height : this.cardHeight,
          marginLeft: this._getRandomInt(-33, -15),
          animationName: 'cardAnimation' + this._getRandomInt(1, 6)
        };

        return (
            <div className="card" style={cardStyle} />
        );
    }
}
