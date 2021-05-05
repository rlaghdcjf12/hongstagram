import React from "react";
import styles from "./MyFeedItem.scss";
import MyFeedModal from "../MyFeedModal"
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const MyFeedItem = ({feed, openFeedModalNum, openFeedModal}) => {
  const imgUrl = feed.image.replace("http://localhost:8000/front_end/public","")

  const openFeed = () => {
    console.log("feed id : " + feed.id);
    openFeedModal({openFeedModalNum: feed.id});
  }

  return (
    <div>
      <MyFeedModal feed={feed} />
      <div className={cx("myFeed-item")} onClick={openFeed}>
        <img src={imgUrl} alt="feed"/>
      </div>
    </div>
  );
  
};



export default MyFeedItem;