'use strict';

const cardTypes = [
	"diamond",
	"spade",
	"club",
	"heart"
]

const cardFigures = [
	"1", "2", "3", "4", "5", "6", "7", "8", "9", "X",
	"J", "Q", "K"
]

class Card {
	constructor(type, figure) {
		this.type = type;
		this.figure = figure;
	}
}
