import React, { Component } from "react";
import { connect } from "react-redux";
import ProfileWrapper from "../components/profile/ProfileWrapper";
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
    const { feeds } = this.props;
    return (
      <div>
        <MyInfo />
        <MyStory />
        <ProfileWrapper>
          <FeedList feeds={feeds}/>
        </ProfileWrapper>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  feeds: state.feeds.feeds,
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