import React, { Component } from "react";
import { connect } from "react-redux";
import Tweet from "./Tweet";
import NewTweet from "./NewTweet";

export class TweetPage extends Component {
  render() {
    const { id, replies } = this.props;
    return (
      <div>
        {/* id in tweet will display origin id tweet */}
        <Tweet tweetId={id} />

        {/* id here will till NewTweet component the new tweet will reply to this id tweet  */}
        <NewTweet id={id} />

        {replies.length !== 0 && <h3 className="center">Replies</h3>}

        <ul>
          {replies.map(replyId => (
            <li key={replyId}>{<Tweet tweetId={replyId} />}</li>
          ))}
        </ul>
      </div>
    );
  }
}
const mapStateToProps = ({ authedUser, users, tweets }, props) => {
  const { id } = props.match.params;
  return {
    id,
    replies: !tweets[id]
      ? []
      : tweets[id].replies.sort(
          (a, b) => tweets[b].timestamp - tweets[a].timestamp
        ),
  };
};

export default connect(mapStateToProps)(TweetPage);
