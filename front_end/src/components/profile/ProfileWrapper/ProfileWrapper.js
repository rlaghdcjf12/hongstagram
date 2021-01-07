import React from "react";
import styles from "./ProfileWrapper.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const ProfileWrapper = ({ children }) => (
  <div className={cx("profileWrapper")}>{children}</div>
);

export default ProfileWrapper;