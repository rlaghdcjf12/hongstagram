import React from "react";
import styles from "./feedItem.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const FeedItem = ({
  feed
}) => {
  return (
    <div className={cx("feed-item")}>
        <div className={cx("feed-header")}>
            <image className={cx("profile-image")} src="https://placeimg.com/42/42/people"/>
            <div className={cx("profile-name")}>Hong</div>
            <div className={cx("feed-place")}>서울</div>
            <div>. . .</div>
        </div>
        <div className={cx("feed-images")}>
            <image src="https://placeimg.com/600/600/people"/>
        </div>
        <div className={cx("feed-textbox")}>{feed.text}</div>
    </div>
  );
};

export default FeedItem;