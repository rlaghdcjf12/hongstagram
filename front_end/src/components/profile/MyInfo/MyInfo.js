import React from "react";
import styles from "./MyInfo.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const MyInfo = () => (
  <div className={cx("myInfoBox")}>
      <div className={cx("upperBox")}>
        <div className={cx("imageBox")}>
            <img className={cx("profile-image")} src="https://placeimg.com/50/50/people"  alt="profile"/>
        </div>
        <div className={cx("infoBox")}>
            <div className={cx("nickname")}></div>
            <div className={cx("edit")}></div>
        </div>
      </div>
      <div className={cx("textBox")}>
        <div className={cx("username")}></div>
        <div className={cx("introduce")}></div>
      </div>
  </div>
);

export default MyInfo;