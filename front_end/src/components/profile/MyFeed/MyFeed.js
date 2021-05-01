import React from "react";
import styles from "./MyFeed.scss";
import classNames from "classnames/bind";
import MyFeedItem from "../MyFeedItem";

const cx = classNames.bind(styles);
const click = () => {
  alert("please add your feed.");
}

const MyFeed = ( {feeds} ) => {

  const feedList = feeds.map((feed, i) => {
      return (
        <div>
          <MyFeedItem
            feed={feed}
            key={feed.id}
          />
        </div>
        
      );
    });
  return (
      <div className={cx("myFeed-list")}>
        <div className={cx("myFeed-add")} onClick={click}>
          <div className={cx("add_button")}>+</div>
        </div>
        {feedList}
      </div>
  );
}

export default MyFeed;