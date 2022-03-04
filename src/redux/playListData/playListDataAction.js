import {
  FETCH_PAYLIST_REQUEST,
  FETCH_PAYLIST_SUCCESS,
  FETCH_PAYLIST_FAILURE,
} from "./playListDataTypes";

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
        const playlist = response.data
        dispatch(fetchDataSuccess(playlist.data))
      })
      .catch((error) => {
        dispatch(fetchDataFailure(error.code))
      })
  } catch (error) {
    dispatch(fetchDataFailure(error))
  }
};
