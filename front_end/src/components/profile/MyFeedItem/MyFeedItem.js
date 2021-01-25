import React from "react";
import styles from "./MyFeedItem.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const MyFeedItem = ({
  feed
}) => {
  const imgUrl = feed.image.replace("http://localhost:8000/front_end/public","")
  return (
    <div className={cx("myFeed-item")}>
      <img src={imgUrl} alt="feed"/>
    </div>
  );
  
};



export default MyFeedItem;