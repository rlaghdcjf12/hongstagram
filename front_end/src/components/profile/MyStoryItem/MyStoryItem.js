import React from "react";
import styles from "./MyStoryItem.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const MyStoryItem = ({
  story
}) => {
  return (
    <div className={cx("myStory-item")}>
      story.image
    </div>
  );
  
};



export default MyStoryItem;