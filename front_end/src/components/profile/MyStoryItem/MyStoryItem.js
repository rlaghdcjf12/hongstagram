import React from "react";
import styles from "./MyStoryItem.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const MyStoryItem = ({
  story
}) => {
  return (
    <div className={cx("myStory-item")}>
      <div className={cx("storyImage")}>
        <img src="https://placeimg.com/77/77/people" alt="Story"/>
      </div>
      <div className={cx("storyTitle")}>스토리 1</div>
    </div>
  );
  
};



export default MyStoryItem;