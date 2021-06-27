import React, { Component } from "react";
import { connect } from "react-redux";
import FeedWrapper from "../components/feeds/feedWrapper";
import feedItem from "../components/feeds/feedItem";
import * as feedActions from "../store/modules/feeds";

export class FeedPageContainer extends Component {
  componentDidMount() {
    const { feedId } = this.props;
    this.getFeed({feedId});
  }

  getFeed = ({feedId}) => {
    const {getFeedPage} = this.props;
    getFeedPage({feedId});
  };

  render() {
    const { feedPage, feedId } = this.props;
    return (
      <div>
        <FeedWrapper>
          {feedId}
          <feedItem feed={feedPage} key={feedId}/>
        </FeedWrapper>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  feedPage: state.feeds.currentFocus.currentfeedPage,
});

const mapDispatchToProps = dispatch => {
  return {
    getFeedPage: ({feedId}) => {
      dispatch(feedActions.getFeedPage(feedId));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FeedPageContainer);