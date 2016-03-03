import Deck from "../src/Deck";
import assert from "assert";

const deck = new Deck();

describe("Deck", () => {
  describe("Test", () => {
    it("should have cards", () => {
      assert.equal(true, deck.hasCards());
    });

    it("should have 52 cards", () => {
      assert.equal(52, deck.cards.length);
    });

    it("should don't have less 52 cards", () => {
      const set = new Set(deck.cards);
      assert.equal(52, set.size);
    });
  });
});
