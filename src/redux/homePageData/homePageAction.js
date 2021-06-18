import axios from "axios";

import {
  HOMEPAGE_DATA_REQUEST,
  HOMEPAGE_DATA_SUCCESS,
  HOMEPAGE_DATA_FAILURE,
} from "./homePageType";

const fetchHomePageRequest = () => {
  return {
    type: HOMEPAGE_DATA_REQUEST,
  };
};

const fetchHomePageSuccess = (user) => {
  return {
    type: HOMEPAGE_DATA_SUCCESS,
    payload: user,
  };
};

const fetchHomePageFailure = (error) => {
  return {
    type: HOMEPAGE_DATA_FAILURE,
    payload: error,
  };
};

export const fetchHomeData = (code, id) => (dispatch) =>{
  
        dispatch(fetchHomePageRequest());
        try {
      axios
        .post("https://deezify-app-feeder.herokuapp.com/home", {
          accessToken: code,
          userId: id,
        })

        .then((response) => {
          const homePageData = response.data;
          console.log(homePageData, "homePageData");
          dispatch(fetchHomePageSuccess(homePageData));
        })
        .catch((error) => {
          const errorMsg = error.message;
          dispatch(fetchHomePageFailure(errorMsg));
        });
    } catch (error) {
        dispatch(fetchHomePageFailure(error))
    }  

};
