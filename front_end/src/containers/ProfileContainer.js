import React, { Component } from "react";
import { connect } from "react-redux";
import ProfileWrapper from "../components/profile/ProfileWrapper";
import MyInfo from "../components/profile/MyInfo";
import MyStory from "../components/profile/MyStory";
import MyFeed from "../components/profile/MyFeed";
import MyFeedWrapper from "../components/profile/MyFeedWrapper";
import * as authActions from "../store/modules/auth";
import * as feedActions from "../store/modules/feeds";

export class ProfileContainer extends Component {
  componentDidMount() {
    this.getMyInfo();
    this.getFeeds();
  }

  getFeeds = () => {
    const { getFeeds } = this.props;
    getFeeds();
  };

  getMyInfo = () => {
    const { getMyInfo } = this.props;
    getMyInfo();
  };


  render() {
    const { 
      feeds, myInfo, menuNum, changeProfileTab, 
      openFeedModal, openFeedModalNum, getFeedOwner, owner, addFeed, imagePreview, preview } = this.props;
    return (
      <ProfileWrapper>
        <MyInfo 
          myInfo={myInfo}
          feeds={feeds}/>
        <MyStory />
        <MyFeedWrapper menuNum={menuNum} changeProfileTab={changeProfileTab}>
            {menuNum === "0" ? 
              <MyFeed 
                feeds={feeds} 
                openFeedModalNum={openFeedModalNum} openFeedModal={openFeedModal} 
                getFeedOwner={getFeedOwner} owner={owner}
                addFeed={addFeed}
                myInfo={myInfo}
                imagePreview={imagePreview}
                preview={preview}
              /> 
            : 
              <div></div>}
        </MyFeedWrapper>
      </ProfileWrapper>
    );
  }
}

const mapStateToProps = state => ({
  feeds: state.feeds.feeds,
  myInfo: state.auth.myInfo,
  menuNum: state.feeds.menuNum,
  openFeedModalNum: state.feeds.openFeedModalNum,
  owner: state.feeds.owner,
  preview: state.feeds.preview,
});

const mapDispatchToProps = dispatch => {
  return {
    getFeeds: () => {
      dispatch(feedActions.getFeeds());
    },
    getMyInfo: () => {
      dispatch(authActions.getMyInfo());
    },
    changeProfileTab: ({menuNum}) => {
      dispatch(feedActions.changeProfileTab({menuNum}));
    },
    openFeedModal: ({openFeedModalNum}) => {
      dispatch(feedActions.openFeedModal({openFeedModalNum}));
    },
    getFeedOwner: ({feedNum}) => {
      dispatch(feedActions.getFeedOwner({feedNum}));
    },
    addFeed: () => {
      dispatch(feedActions.addFeed());
    },
    imagePreview: ({file, previewURL}) => {
      dispatch(feedActions.imagePreview({file, previewURL}));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileContainer);