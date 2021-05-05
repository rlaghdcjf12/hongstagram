import React from "react";
import styles from "./MyFeedModal.scss";
import classNames from "classnames/bind";
import MyFeedItem from "../MyFeedItem";

const cx = classNames.bind(styles);

const MyFeedModal = ( {feed} ) => {

  return (
      <div className={cx("myFeed-list")}>
        <div className={cx("myFeed-add")}>
          <div className={cx("add_button")}>+</div>
        </div>
      </div>
  );
}

export default MyFeedModal;