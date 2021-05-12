import React from "react";
import styles from "./MyFeedModal.scss";
import classNames from "classnames/bind";
import MyFeedItem from "../MyFeedItem";

const cx = classNames.bind(styles);

const MyFeedModal = ( {feed, openFeedModalNum} ) => {
  const imgUrl = feed.image.replace("http://localhost:8000/front_end/public","")

  return (
      <div className={cx("myFeedModal", openFeedModalNum == feed.id ? "" : "closed")}>
        <div className={cx("myFeedPopUp")}>
          <div className={cx("imageSector")}>
            <img src={imgUrl} alt="feed"/>
          </div>
          <div className={cx("contentsSector")}>
            <div className={cx("contentsSector-title")}>
            </div>
            <div className={cx("contentsSector-comments")}>
            </div>
            <div className={cx("contentsSector-details")}>
            </div>
            <div className={cx("contentsSector-comment_input")}>
            </div>
          </div>
        </div>
      </div>
  );
}

export default MyFeedModal;