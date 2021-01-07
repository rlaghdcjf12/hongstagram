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
    const { feeds, username, nickname, profileImage, introduce } = this.props;
    return (
      <ProfileWrapper>
        <MyInfo 
          username={username}
          nickname={nickname}
          profileImage={profileImage}
          introduce={introduce}/>
        <MyStory />
        <MyFeedWrapper>
          <MyFeed feeds={feeds} />
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
});

const mapDispatchToProps = dispatch => {
  return {
    getFeeds: () => {
      dispatch(feedActions.getFeeds());
    },
    getMyInfo: () => {
      dispatch(authActions.getMyInfo());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileContainer);