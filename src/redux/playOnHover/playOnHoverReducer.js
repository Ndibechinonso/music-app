import { PLAY_ON_HOVER, STOP_ON_HOVER } from "./playOnHoverTypes";

const initialState = {
    play: false,
};

const playOnHoverReducer = (state = initialState, action) => {
    switch (action.type) {
        case PLAY_ON_HOVER:
            return {
                ...state,
                play: true,
            };

        case STOP_ON_HOVER:
            return {
                play: false,
            };

        default:
            return state;
    }
};

export default playOnHoverReducer;
