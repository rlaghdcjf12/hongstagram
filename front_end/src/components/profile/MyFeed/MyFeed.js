import React from "react";
import styles from "./MyFeed.scss";
import classNames from "classnames/bind";
import MyFeedItem from "../MyFeedItem";

const cx = classNames.bind(styles);

const MyFeed = ( {feeds} ) => {
  const feedList = feeds.map((feed, i) => {
      return (
        <MyFeedItem
          feed={feed}
          key={feed.id}
        />
      );
      // if(i === 1 || i === 2){
      //   var row = document.querySelector(".row0");
      //   row.append(<MyFeedItem feed={feed} key={feed.id}/>);
      // }
      // else if(i%3 === 0) {
      //   return (
      //     <div className={cx("row", i/3)}>
      //       <MyFeedItem feed={feed} key={feed.id}/>
      //     </div>
      //   );
      // }
      // else {
      //   var row = document.querySelector(".row", i/3);
      //   row.append(<MyFeedItem feed={feed} key={feed.id}/>);
      // }
    });
  return (
      <div className={cx("myFeed-list")}>
          {feedList}
      </div>
  );
}

export default MyFeed;