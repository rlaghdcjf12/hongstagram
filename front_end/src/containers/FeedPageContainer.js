import React, { Component } from "react";
import { connect } from "react-redux";
import FeedWrapper from "../components/feeds/feedWrapper";
import FeedDetail from "../components/feeds/feedDetail";
import * as feedActions from "../store/modules/feeds";

export class FeedPageContainer extends Component {
  componentDidMount() {
    const { feedId } = this.props;
    this.getFeed({feedId});
  }

  getFeed = ({feedId}) => {
    const {getFeedPage, getFeedOwner} = this.props;
    getFeedPage({feedId});
    getFeedOwner({feedNum : feedId});
  };

  render() {
    const { feedPage, currentFocus, openSubMenu, DeletePopup, DeleteFeed } = this.props;
    return (
      <div>
        <FeedWrapper>
          <FeedDetail feed={feedPage}  currentFocus={currentFocus} 
            openSubMenu={openSubMenu} DeletePopup={DeletePopup} DeleteFeed={DeleteFeed} handleDelete={DeleteFeed}/>
        </FeedWrapper>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  feedPage: state.feeds.currentFocus.currentfeedPage,
  currentFocus: state.feeds.currentFocus,
});

const mapDispatchToProps = dispatch => {
  return {
    getFeedPage: ({feedId}) => {
      dispatch(feedActions.getFeedPage(feedId));
    },
    getFeedOwner: ({feedNum}) => {
      dispatch(feedActions.getFeedOwner({feedNum}));
    },
    openSubMenu: ({openFlag}) => {
      dispatch(feedActions.openSubMenu({openFlag}));
    },
    DeletePopup: ({deletePopupFlag}) => {
      dispatch(feedActions.DeletePopup({deletePopupFlag}));
    },
    DeleteFeed: ({feedId}) => {
      dispatch(feedActions.DeleteFeed({feedId}));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FeedPageContainer);