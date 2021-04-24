import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { handleAddNewTweet } from "../actions/tweets";

class NewTweet extends Component {
  state = {
    text: "",
    toHome: false,
  };

  handleChange = e => {
    const text = e.target.value;
    this.setState(() => ({
      text,
    }));
  };

  handleSubmit = e => {
    e.preventDefault();
    const { text } = this.state;
    const { dispatch, id } = this.props;
    !id && this.props.history.push("/");

    // if this tweet has id here, so this tweet is replying to this tweet id, if not so this is new tweet
    dispatch(handleAddNewTweet(text, id));

    this.setState(() => ({
      text: "",
      toHome: id ? false : true,
    }));
  };

  render() {
    const { text } = this.state;

    if (this.state.toHome) return <Redirect exact to="/" />;

    const tweetLeft = 280 - text.length;

    return (
      <div>
        <h3 className="center">Compose new Tweet</h3>
        <form className="new-tweet" onSubmit={this.handleSubmit}>
          <textarea
            placeholder="What's happening?"
            value={text}
            onChange={this.handleChange}
            className="textarea"
            maxLength={280}
          />

          {tweetLeft <= 100 && <div className="tweet-length">{tweetLeft}</div>}

          <button className="btn" type="submit" disabled={text === ""}>
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default connect()(NewTweet);
