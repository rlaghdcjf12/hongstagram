import React from "react";
import styles from "./MyFeed.scss";
import classNames from "classnames/bind";
import MyFeedItem from "../MyFeedItem";
import AddFeedModal from "../AddFeedModal";

const cx = classNames.bind(styles);


const MyFeed = ( {feeds, openFeedModal, getFeedOwner, imagePreview, onChangeInput,
  currentFocus, myInfo, addFeedModal, addFeed} ) => {
  const addFeedClick = () => {
    openFeedModal({openFeedModalNum: -1});
  }

  const closeFeed = (e) => {
    if(e.target.id === "myFeedModal"){
      openFeedModal({openFeedModalNum: 0});
      imagePreview({addFeed_previewURL: ""})
    }
  }

  const feedList = feeds.map((feed, i) => {
      return (
        <MyFeedItem
          feed={feed} key={feed.id}
          openFeedModal={openFeedModal} getFeedOwner={getFeedOwner} closeFeed={closeFeed}
          currentFocus={currentFocus}
        />
      );
    });
  return (
      <div className={cx("myFeed-list")}>
        <AddFeedModal closeFeed={closeFeed} imagePreview={imagePreview} onChangeInput={onChangeInput} addFeed={addFeed}
          addFeedModal={addFeedModal} currentFocus={currentFocus} myInfo={myInfo}/>
        <div className={cx("myFeed-add")} onClick={addFeedClick}>
          <div className={cx("add_button")}>+</div>
        </div>
        {feedList}
      </div>
  );
}

export default MyFeed;