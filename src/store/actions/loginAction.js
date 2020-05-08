import { FETCHING_RATINGS_SUCCESS } from "./ratingAction";
import { FETCHING_WATCHLIST_SUCCESS } from "./watchlistActions";
import axiosWithAuth from "../../utils/axiosWithAuth.js";
export const FETCHING_USER_LOGIN_SUCCESS = "FETCHING_USER_LOGIN_SUCCESS";
export const FETCHING_USER_LOGIN_FAIL = "FETCHING_USER_LOGIN_FAIL";


// LOGIN
export function loginAction(token, okta_id, history) {
  console.log('okta ID in loginAction',okta_id)
  return dispatch => {
    axiosWithAuth(token)
      .post("/login", {id:okta_id})
      .then(res => {
        console.log("loginAction res",res)
        // localStorage.setItem("token", res.data.token);
        dispatch({ 
          type: FETCHING_USER_LOGIN_SUCCESS,
          payload: res.data.user_id });
        dispatch({
          type: FETCHING_RATINGS_SUCCESS,
          payload: res.data.ratings
        });
          dispatch({
            type: FETCHING_WATCHLIST_SUCCESS,
            payload: res.data.watchlist
          });
        history.push(`/${res.data.user_id}/explore`);
      })
      .catch(err => {
        console.log("ERROR: ", err);
        dispatch({
          type: FETCHING_USER_LOGIN_FAIL,
          payload: err
        });
      });
  };
}
