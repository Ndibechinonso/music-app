import { TOKEN_REQUEST, TOKEN_SUCCESS, TOKEN_FAILURE } from "./getTokenTypes";

const initialState = {
    loading: false,
    tokenData: {},
    userData: {},
    error: "",
};

const tokenReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOKEN_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case TOKEN_SUCCESS:
            return {
                loading: false,
                tokenData: action.payload.token,
                userData: action.payload.userData,
                error: "",
            };
        case TOKEN_FAILURE:
            return {
                loading: false,
                tokenData: {},
                userData: {},
                error: action.payload,
            };

        default:
            return state;
    }
};

export default tokenReducer;
