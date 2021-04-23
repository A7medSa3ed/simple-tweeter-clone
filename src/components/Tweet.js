import React, { Component } from "react";
import { connect } from "react-redux";
import { formatTweet, formatDate } from "../utils/helpers";
import { TiArrowBackOutline } from "react-icons/ti";
import { TiHeartOutline } from "react-icons/ti";
import { TiHeartFullOutline } from "react-icons/ti";
import { handleToggleTweet } from "../actions/tweets";
import { Link, withRouter } from "react-router-dom";
export class Tweet extends Component {
  handleLike = e => {
    e.preventDefault();
    const { dispatch, tweet, authedUser } = this.props;

    // todo: Handle Like Tweet
    dispatch(
      handleToggleTweet({
        id: tweet.id,
        hasLiked: tweet.hasLiked,
        authedUser,
      })
    );
  };
  toParent = (e, id) => {
    e.preventDefault();
    this.props.history.push(`/tweet/${id}`);
  };
  render() {
    const { tweet } = this.props;

    if (tweet === null)
      return (
        <p style={{ color: "red", padding: "30px" }}>
          This Tweet Doen't Exist, You Can Compose New One
        </p>
      );

    const {
      name,
      timestamp,
      text,
      avatar,
      likes,
      replies,
      hasLiked,
      parent,
      id,
    } = tweet;

    return (
      <Link to={`/tweet/${id}`} className="tweet">
        <img src={avatar} alt={`Avatar of ${name}`} className="avatar" />
        <div className="tweet-info">
          <div>
            <span>{name}</span>
            <div>{formatDate(timestamp)}</div>
            {parent && (
              <button
                className="replying-to"
                onClick={e => this.toParent(e, parent.id)}
              >
                Replying to @{parent.author}
              </button>
            )}
            <p>{text}</p>
          </div>
          <div className="tweet-icons">
            <TiArrowBackOutline className="tweet-icon" />
            <span>{replies !== 0 && replies}</span>
            <button className="heart-button" onClick={this.handleLike}>
              {hasLiked === true ? (
                <TiHeartFullOutline color="#e0245e" className="tweet-icon" />
              ) : (
                <TiHeartOutline className="tweet-icon" />
              )}
            </button>
            <span>{likes !== 0 && likes}</span>
          </div>
        </div>
      </Link>
    );
  }
}

// mapStateToProps take 4 argument --> 1- state will get from store, 2- own Componnet props ...etc
// tweetId --> comming from component props (ownProps)
// state is the first parameter to this function

const mapStateToProps = (state, { tweetId }) => {
  const { authedUser, users, tweets } = state;
  const tweet = tweets[tweetId];
  const parentTweet = tweet ? tweets[tweet.replyingTo] : null;
  return {
    authedUser,
    tweet: tweet
      ? formatTweet(tweet, users[tweet.author], authedUser, parentTweet)
      : null,
  };
};

export default withRouter(connect(mapStateToProps)(Tweet));
