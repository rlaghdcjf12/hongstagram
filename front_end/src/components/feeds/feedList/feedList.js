import React from "react";
import styles from "./feedList.scss";
import classNames from "classnames/bind";
import FeedItem from "../feedItem";

const cx = classNames.bind(styles);

// const FeedList = ({
//   feeds
// }) => {
//   const feedList = feeds.map((feed, i) => {
//     return (
//       <FeedItem
//         feed={feed}
//         key={feed.id}
//       />
//     );
//   });
//   return (
//     <div className={cx("feed-list")}>
//       {feedList}
//     </div>
//   );
// };

const FeedList = ( {feeds} ) => {
  const feedList = feeds.map((feed, i) => {
      return (
        <FeedItem
          feed={feed}
          key={feed.id}
        />
      );
    });
  return (
      <div className={cx("feed-list")}>
          {feedList}
      </div>
  );
}

export default FeedList;