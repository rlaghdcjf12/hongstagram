import React from "react";
import styles from "./MyFeed.scss";
import classNames from "classnames/bind";
import MyFeedItem from "../MyFeedItem";
import AddFeedModal from "../AddFeedModal";

const cx = classNames.bind(styles);


const MyFeed = ( {feeds, openFeedModalNum, openFeedModal, getFeedOwner, owner, addFeed, myInfo, imagePreview, preview} ) => {
  const addFeedClick = () => {
    openFeedModal({openFeedModalNum: -1});
  }

  const closeFeed = (e) => {
    if(e.target.id === "myFeedModal"){
      openFeedModal({openFeedModalNum: 0});
      imagePreview({file: "", previewURL: ""})
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
        <AddFeedModal openFeedModalNum={openFeedModalNum} myInfo={myInfo} closeFeed={closeFeed} imagePreview={imagePreview} preview={preview}></AddFeedModal>
        <div className={cx("myFeed-add")} onClick={addFeedClick}>
          <div className={cx("add_button")}>+</div>
        </div>
        {feedList}
      </div>
  );
}

export default MyFeed;