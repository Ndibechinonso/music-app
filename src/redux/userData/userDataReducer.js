import {
    USER_DATA_REQUEST,
    USER_DATA_SUCCESS,
    USER_DATA_FAILURE,
} from "./userDataTypes";

const initialState = {
    loading: false,
    data: [],
    error: "",
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_DATA_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case USER_DATA_SUCCESS:
            return {
                loading: false,
                data: action.payload,
                error: "",
            };
        case USER_DATA_FAILURE:
            return {
                loading: false,
                data: [],
                error: action.payload,
            };

        default:
            return state;
    }
};

export default userReducer;
