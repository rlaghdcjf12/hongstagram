import React from "react";
import styles from "./MyStory.scss";
import classNames from "classnames/bind";
import MyStoryItem from "../MyStoryItem";

const cx = classNames.bind(styles);

const MyStory = ( {story} ) => {
  const storyList = story.map((story, i) => {
      return (
        <MyStoryItem
          feed={story}
          key={story.id}
        />
      );
    });
  <div className={cx("myStoryBox")}>
    {storyList}
  </div>
};

export default MyStory;