import React from "react";
import styles from "./MyFeedWrapper.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const MyFeedWrapper = ({ children }) => (
  <div className={cx("myFeedWrapper")}>{children}</div>
);

export default MyFeedWrapper;