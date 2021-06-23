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

    window.addEventListener("scroll", this.handleScroll);
  }

  getFeeds = () => {
    const { getFeeds } = this.props;
    getFeeds();
  };

  getMyInfo = () => {
    const { getMyInfo } = this.props;
    getMyInfo();
  };

  handleChangeInput = ({name, value}) => {
    const { ChangeInput } = this.props;
    ChangeInput({name, value});
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  };

  handleScroll = () => {
    const { innerHeight } = window;
    const { scrollHeight } = document.body;
    const { getMoreFeeds } = this.props;
    const scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop;
    if (scrollHeight - innerHeight - scrollTop < 100) {
      if (!this.props.isLoading && !this.props.isLast) {
        const lastId = this.props.feeds[this.props.feeds.length - 1].id;
        getMoreFeeds({ lastId });
      }
    }
  };

  render() {
    const { 
      feeds,
      changeProfileTab, openFeedModal, getFeedOwner, imagePreview, addFeed, openSubMenu, DeletePopup, DeleteFeed,
      currentFocus, myInfo, addFeedModal, isLoading
    } = this.props;
    const {handleChangeInput} = this;
    return (
      <ProfileWrapper>
        <MyInfo 
          myInfo={myInfo}
          feeds={feeds}/>
        <MyStory />
        <MyFeedWrapper menuNum={currentFocus.menuNum} changeProfileTab={changeProfileTab}>
            {currentFocus.menuNum === "0" ? 
              <MyFeed 
                feeds={feeds}
                openFeedModal={openFeedModal} getFeedOwner={getFeedOwner} imagePreview={imagePreview} onChangeInput={handleChangeInput}
                currentFocus={currentFocus} myInfo={myInfo} addFeedModal={addFeedModal} openSubMenu={openSubMenu} DeletePopup={DeletePopup} DeleteFeed={DeleteFeed}
                addFeed={addFeed}
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
  currentFocus: state.feeds.currentFocus,
  addFeedModal: state.feeds.addFeedModal,
  isLoading: state.feeds.isLoading,
});

const mapDispatchToProps = dispatch => {
  return {
    getFeeds: () => {
      dispatch(feedActions.getFeeds());
    },
    getMoreFeeds: ({lastId}) => {
      dispatch(feedActions.getMoreFeeds({lastId}));
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
    imagePreview: ({addFeed_file, addFeed_previewURL}) => {
      dispatch(feedActions.imagePreview({addFeed_file, addFeed_previewURL}));
    },
    ChangeInput: ({name, value}) => {
      dispatch(feedActions.ChangeInput({name, value}));
    },
    openSubMenu: ({openFlag}) => {
      dispatch(feedActions.openSubMenu({openFlag}));
    },
    DeletePopup: ({deletePopupFlag}) => {
      dispatch(feedActions.DeletePopup({deletePopupFlag}));
    },
    DeleteFeed: ({id}) => {
      dispatch(feedActions.DeleteFeed({id}));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileContainer);