import { saveLikeToggle } from "../utils/api";
import { saveTweet } from "../utils/api";
import { showLoading, hideLoading } from "react-redux-loading";

// Action Types
export const RECEIVE_TWEETS = "RECEIVE_TWEETS";
export const TOGGLE_TWEETS = "TOGGLE_TWEETS";
export const ADD_NEW_TWEET = "ADD_NEW_TWEET";

// get All Tweets
export const receiveTweets = tweets => ({ type: RECEIVE_TWEETS, tweets });

// Handle Like Button
const toggleTweet = ({ id, authedUser, hasLiked }) => ({
  type: TOGGLE_TWEETS,
  id,
  authedUser,
  hasLiked,
});
export const handleToggleTweet = info => dispatch => {
  dispatch(toggleTweet(info));
  return saveLikeToggle(info).catch(e => {
    console.warn("Error In Handle Toggle Tweet", e);
    dispatch(toggleTweet(info));
    alert("there was an error liking the tweet. try again.");
  });
};

// Handle Add New Tweet
const addNewTweet = tweet => ({
  type: ADD_NEW_TWEET,
  tweet,
});
export const handleAddNewTweet = (text, replyingTo) => (dispatch, getState) => {
  const { authedUser } = getState();
  dispatch(showLoading());
  return saveTweet({ text, author: authedUser, replyingTo })
    .then(tweet => dispatch(addNewTweet(tweet)))
    .then(() => dispatch(hideLoading()));
};
