import { saveLikeToggle } from "../utils/api";
import { saveTweet } from "../utils/api";
import { showLoading, hideLoading } from "react-redux-loading";

// Action Types
export const RECEIVE_TWEETS = "RECEIVE_TWEETS";
export const TOGGLE_LIKE_TWEETS = "TOGGLE_LIKE_TWEETS";
export const ADD_NEW_TWEET = "ADD_NEW_TWEET";

// get All Tweets
export const receiveTweets = tweets => ({ type: RECEIVE_TWEETS, tweets });

// Handle Like Button
const toggleLikeTweet = ({ id, authedUser, hasLiked }) => ({
  type: TOGGLE_LIKE_TWEETS,
  id,
  authedUser,
  hasLiked,
});
export const handleToggleLikeTweet = info => dispatch => {
  // clear data of the console before run this action
  console.clear();
  dispatch(toggleLikeTweet(info));
  return saveLikeToggle(info).catch(e => {
    console.warn("Error In Handle Toggle Tweet", e);
    dispatch(toggleLikeTweet(info));
    alert("there was an error liking the tweet. try again.");
  });
};

// Handle Add New Tweet
const addNewTweet = tweet => ({
  type: ADD_NEW_TWEET,
  tweet,
});
export const handleAddNewTweet = (text, replyingTo) => (dispatch, getState) => {
  // clear data of the console before run this action
  console.clear();
  const { authedUser } = getState();
  dispatch(showLoading());
  return saveTweet({ text, author: authedUser, replyingTo })
    .then(tweet => dispatch(addNewTweet(tweet)))
    .then(() => dispatch(hideLoading()));
};
