import React, { Component } from "react";
import { connect } from "react-redux";
import { handeIntialData } from "../actions/shared";
import { BrowserRouter as Router, Route } from "react-router-dom";
import LoadingBar from "react-redux-loading";
import Nav from "./Nav";
import Dashboard from "./Dashboard";
import NewTweet from "./NewTweet";
import TweetPage from "./TweetPage";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handeIntialData());
  }
  render() {
    return (
      <Router>
        <React.Fragment>
          <LoadingBar />
          <div className="container">
            <Nav />
            {this.props.loading === true ? null : (
              <div>
                <Route exact path="/" component={Dashboard} />
                <Route exact path="/new" component={NewTweet} />
                <Route exact path="/tweet/:id" component={TweetPage} />
              </div>
            )}
          </div>
        </React.Fragment>
      </Router>
    );
  }
}
const mapStateToProps = ({ authedUser }) => ({ loading: authedUser === null });

export default connect(mapStateToProps)(App);
