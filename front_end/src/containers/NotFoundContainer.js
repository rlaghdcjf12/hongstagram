import React, { Component } from "react";
import { connect } from "react-redux";
import NotFound from "../components/common/NotFound";
import { withRouter } from "react-router-dom";

export class NotFoundContainer extends Component {
  render() {
    return <NotFound />;
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(NotFoundContainer)
);