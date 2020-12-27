import React, { Component } from "react";
import { connect } from "react-redux";
import FeedWrapper from "../components/feeds/feedWrapper";
import FeedList from "../components/feeds/feedList";
import * as feedActions from "../store/modules/feeds";

export class FeedContainer extends Component {
  componentDidMount() {
    this.getFeeds();
  }

  getFeeds = () => {
    const { getFeeds } = this.props;
    getFeeds();
  };

  render() {
    const { feeds } = this.props;
    return (
      <div>
        <FeedWrapper>
          <FeedList feeds={feeds}/>
        </FeedWrapper>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  feeds: state.feeds,
});

const mapDispatchToProps = dispatch => {
  return {
    getFeeds: () => {
      dispatch(feedActions.getFeeds());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FeedContainer);