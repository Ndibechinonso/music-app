import { PLAY_ON_HOVER, STOP_ON_HOVER } from "./playOnHoverTypes";

export const fetchPlayState = () => {
    return {
        type: PLAY_ON_HOVER,
    };
};

export const fetchStopState = () => {
    return {
        type: STOP_ON_HOVER,
    };
};
