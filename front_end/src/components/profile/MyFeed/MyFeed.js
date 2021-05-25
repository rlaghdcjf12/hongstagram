import React from "react";
import styles from "./MyFeed.scss";
import classNames from "classnames/bind";
import MyFeedItem from "../MyFeedItem";

const cx = classNames.bind(styles);


const MyFeed = ( {feeds, openFeedModalNum, openFeedModal, getFeedOwner, owner, addFeed} ) => {
  const addFeedClick = () => {
    alert("please add your feed.");
    
  }

  const closeFeed = (e) => {
    if(e.target.id == "myFeedModal"){
      openFeedModal({openFeedModalNum: 0});
    }
  }

  const feedList = feeds.map((feed, i) => {
      return (
        <MyFeedItem
          feed={feed}
          key={feed.id}
          openFeedModalNum={openFeedModalNum}
          openFeedModal={openFeedModal}
          getFeedOwner={getFeedOwner}
          owner={owner}
          closeFeed={closeFeed}
        />
      );
    });
  return (
      <div className={cx("myFeed-list")}>
        <div className={cx("myFeed-add")} onClick={addFeedClick}>
          <div className={cx("add_button")}>+</div>
        </div>
        {feedList}
      </div>
  );
}

export default MyFeed;