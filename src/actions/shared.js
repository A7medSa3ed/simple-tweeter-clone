import { getInitialData } from "../utils/api.js";
import { receiveTweets } from "./tweets";
import { receiveUsers } from "./users";
import { setAuthedUsers } from "./authedUser";
import { showLoading, hideLoading } from "react-redux-loading";

const AUTHED_ID = "tylermcginnis";

// Get Intial Data Of Tweets And users
export const handeIntialData = () => dispatch => {
  dispatch(showLoading());
  getInitialData().then(({ users, tweets }) => {
    dispatch(receiveUsers(users));
    dispatch(receiveTweets(tweets));
    dispatch(setAuthedUsers(AUTHED_ID));
    dispatch(hideLoading());
  });
};
