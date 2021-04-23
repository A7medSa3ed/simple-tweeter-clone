import React, { Component } from "react";
import { connect } from "react-redux";
import Tweet from "./Tweet";
export class Dashboard extends Component {
  render() {
    return (
      <div>
        <h3 className="center">Your Timeline</h3>
        <ul className="dashboard-list">
          {this.props.tweetsId.map(tweetId => (
            <li key={tweetId}>
              <Tweet tweetId={tweetId} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
const mapStateToProps = ({ tweets }) => ({
  tweetsId: Object.keys(tweets).sort(
    (a, b) => tweets[b].timestamp - tweets[a].timestamp
  ),
});
export default connect(mapStateToProps)(Dashboard);
