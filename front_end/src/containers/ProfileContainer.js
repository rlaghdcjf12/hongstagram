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

  changeProfileTab = (menuNum) => {
    const { changeProfileTab } = this.props;
    changeProfileTab(menuNum);
  }

  openFeedModal = ({openFeedModalNum}) => {
    const {openFeedModal} = this.props;
    openFeedModal(openFeedModalNum);
  }

  getFeedDetail = ({feedNum}) => {
    const {getFeedDetail} = this.props;
    getFeedDetail(feedNum)
  }

  render() {
    const { 
      feeds, username, nickname, profileImage, introduce, menuNum, changeProfileTab, 
      openFeedModal, openFeedModalNum, getFeedDetail, feedDetail } = this.props;
    return (
      <ProfileWrapper>
        <MyInfo 
          username={username}
          nickname={nickname}
          profileImage={profileImage}
          introduce={introduce}
          feeds={feeds}/>
        <MyStory />
        <MyFeedWrapper menuNum={menuNum} changeProfileTab={changeProfileTab}>
            {menuNum === "0" ? 
              <MyFeed feeds={feeds} openFeedModalNum={openFeedModalNum} openFeedModal={openFeedModal} getFeedDetail={getFeedDetail} feedDetail={feedDetail}/> 
            : 
              <div></div>}
        </MyFeedWrapper>
      </ProfileWrapper>
    );
  }
}

const mapStateToProps = state => ({
  feeds: state.feeds.feeds,
  username: state.auth.myInfo.username,
  nickname: state.auth.myInfo.nickname,
  profileImage : state.auth.myInfo.profileImage,
  introduce: state.auth.myInfo.introduce,
  menuNum: state.feeds.menuNum,
  openFeedModalNum: state.feeds.openFeedModalNum,
  feedDetail: state.feedDetail
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
    getFeedDetail: ({feedNum}) => {
      dispatch(feedActions.getFeedDetail({feedNum}));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileContainer);