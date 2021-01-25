import React from "react";
import styles from "./MyFeed.scss";
import classNames from "classnames/bind";
import MyFeedItem from "../MyFeedItem";

const cx = classNames.bind(styles);

const MyFeed = ( {feeds} ) => {
  const feedList = feeds.map((feed, i) => {
      return (
        <MyFeedItem
          feed={feed}
          key={feed.id}
        />
      );
    });
  return (
      <div className={cx("myFeed-list")}>
        
          {feedList}
      </div>
  );
}

export default MyFeed;