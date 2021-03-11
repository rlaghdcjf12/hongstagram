import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "../components/structure/Header";
import * as authActions from "../store/modules/auth";

export class HeaderContainer extends Component {
  componentDidMount() {
    this.getMyInfo();
  }

  handleLogout = () => {
    const { logout } = this.props;
    const userInfo = JSON.parse(localStorage.getItem("userInfo"))
    if(userInfo && userInfo.token === undefined){
      localStorage.removeItem("userInfo");
      window.location.href = "/auth/login";
    }
    else logout();
  };

  getMyInfo = () => {
    const { getMyInfo } = this.props;
    getMyInfo();
  };

  profileDropdown = ({dropDownFlag}) => {
    const { profileDropdown } = this.props;
    if(dropDownFlag == "closed") profileDropdown({dropDownFlag :"open"});
    else profileDropdown({dropDownFlag : "closed"});
  }

  render() {
    const { handleLogout, profileDropdown } = this;
    const { profileImage, dropDownFlag } = this.props;
    return <Header onLogout={handleLogout} profileDropdown= {profileDropdown} profileImage={profileImage} dropDownFlag={dropDownFlag}/>;
  }
}

const mapStateToProps = state => ({
  profileImage: state.auth.myInfo.profileImage,
  dropDownFlag: state.auth.featureFlag.dropDownFlag,
});

const mapDispatchToProps = dispatch => {
  return {
    logout: () => {
      dispatch(authActions.logout());
    },
    getMyInfo: () => {
      dispatch(authActions.getMyInfo());
    },
    profileDropdown: ({dropDownFlag}) => {
      dispatch(authActions.profileDropdown({dropDownFlag})); 
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderContainer);