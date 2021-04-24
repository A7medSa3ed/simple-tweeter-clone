import {
  RECEIVE_TWEETS,
  TOGGLE_LIKE_TWEETS,
  ADD_NEW_TWEET,
} from "../actions/tweets";

export const tweets = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_TWEETS:
      return {
        ...state,
        ...action.tweets,
      };
    case TOGGLE_LIKE_TWEETS:
      return {
        ...state, // get all tweets state
        [action.id]: {
          // get the tweet that have this id
          ...state[action.id], // get all of this tweet object
          likes:
            // if the this user who is logged in (authed user) was like this tweet and click on like button?
            action.hasLiked === true
              ? state[action.id].likes.filter(uid => uid !== action.authedUser)
              : state[action.id].likes.concat([action.authedUser]),
          // true, now he dislike this tweet, because he did liked it before
          // false, now he liked this tweet, because he didn't liked it before
        },
      };
    case ADD_NEW_TWEET:
      const { tweet } = action;
      let replyingTo = {};

      // if there is id, so this tweet is replying to some one
      // and check if this id of tweet.replyingTo is exist on tweet state
      if (state.hasOwnProperty(tweet.replyingTo) && tweet.replyingTo) {
        replyingTo = {
          [tweet.replyingTo]: {
            ...state[tweet.replyingTo],
            replies: state[tweet.replyingTo].replies.concat([tweet.id]),
          },
        };
      }
      // if there is no id, so this tweet is new tweet

      return {
        ...state, // get all tweets on the state
        [tweet.id]: tweet, // add new tweet with this id
        ...replyingTo, // change existing tweet's replies array that will replying to
      };
    default:
      return state;
  }
};
