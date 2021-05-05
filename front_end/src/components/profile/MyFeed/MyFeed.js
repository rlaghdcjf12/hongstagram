import React from "react";
import styles from "./MyFeed.scss";
import classNames from "classnames/bind";
import MyFeedItem from "../MyFeedItem";

const cx = classNames.bind(styles);
const addFeed = () => {
  alert("please add your feed.");
}


const MyFeed = ( {feeds, openFeedModalNum, openFeedModal} ) => {

  const feedList = feeds.map((feed, i) => {
      return (
        <MyFeedItem
          feed={feed}
          key={feed.id}
          openFeedModalNum={openFeedModalNum}
          openFeedModal={openFeedModal}
        />
      );
    });
  return (
      <div className={cx("myFeed-list")}>
        <div className={cx("myFeed-add")} onClick={addFeed}>
          <div className={cx("add_button")}>+</div>
        </div>
        {feedList}
      </div>
  );
}

export default MyFeed;