import React from "react";
import styles from "./MyFeedItem.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const MyFeedItem = ({
  feed
}) => {
  return (
    <div className={cx("myFeed-item")}>
      feed.image
    </div>
  );
  
};



export default MyFeedItem;