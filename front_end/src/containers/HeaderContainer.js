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

  render() {
    const { handleLogout } = this;
    const { profileImage } = this.props;
    return <Header profileImage={profileImage} onLogout={handleLogout} />;
  }
}

const mapStateToProps = state => ({
  profileImage: state.auth.myInfo.profileImage,
});

const mapDispatchToProps = dispatch => {
  return {
    logout: () => {
      dispatch(authActions.logout());
    },
    getMyInfo: () => {
      dispatch(authActions.getMyInfo());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderContainer);