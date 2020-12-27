import React from "react";
import styles from "./feedWrapper.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const FeedWrapper = ({ children }) => (
  <div className={cx("feedWrapper")}>{children}</div>
);

export default FeedWrapper;