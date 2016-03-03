import { ReduceStore } from "flux/utils";
import AppDispatcher from "./AppDispatcher";
import { ADD_NOTIFICATION, DELETE_NOTIFICATION } from "./Actions";
import Deck from "./Deck";
import Player from "./Player";
import Game from "./Game";

class AppStore extends ReduceStore {
    getInitialState() {
        const deck = new Deck();
        const player = new Player(100);
        const game = new Game(deck, [player]);
        game.nextTurn();
        return {
            player: player,
            deck: deck,
            game : game,
            notifications: []
        };
    }

    reduce(state, action) {
        console.log("AppStore", action.type, state, action);
        switch (action.type) {
            case ADD_NOTIFICATION:
                state.notifications.push({
                    message: action.value,
                    key: Math.floor((1 + Math.random()) * 0x10000).toString(16)
                });
                return state;
            case DELETE_NOTIFICATION:
                state.notifications = state.notifications.filter(n => n.key !== action.value.key);
                return state;
            default:
                console.log("AppStore", "default", state, action);
                return state;
        }
    }
}

const appStore = new AppStore(AppDispatcher);
export default appStore;
