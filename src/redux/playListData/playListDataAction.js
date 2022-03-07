import {
  FETCH_PAYLIST_REQUEST,
  FETCH_PAYLIST_SUCCESS,
  FETCH_PAYLIST_FAILURE,
} from "./playListDataTypes";
import errorHandler from "../../components/errorHandler";
import axios from "axios";

const fetchDataRequest = () => {
  return { type: FETCH_PAYLIST_REQUEST };
};
const fetchDataSuccess = (playlist) => {
  return { type: FETCH_PAYLIST_SUCCESS, payload: playlist };
};

const fetchDataFailure = (error) => {
  return {
    type: FETCH_PAYLIST_FAILURE,
    payload: error,
  };
};

export const fetchPlaylist = (url) => (dispatch) => {
  dispatch(fetchDataRequest())
  try {
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}users/playlist`, {
        tracklist: url,
      })
      .then((response) => {
        dispatch(fetchDataSuccess(response.data.data))
        errorHandler(response.data.code)
      })
      .catch((error) => {
        dispatch(fetchDataFailure(error))
      })
  } catch (error) {
    dispatch(fetchDataFailure(error))
  }
};

