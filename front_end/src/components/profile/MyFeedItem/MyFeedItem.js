import React from "react";
import styles from "./MyFeedItem.scss";
import MyFeedModal from "../MyFeedModal"
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const MyFeedItem = ({feed, openFeedModalNum, openFeedModal, getFeedDetail, feedDetail}) => {
  const imgUrl = feed.image.replace("http://localhost:8000/front_end/public","")

  const openFeed = () => {
    console.log("feed id : " + feed.id);
    openFeedModal({openFeedModalNum: feed.id});
    getFeedDetail({feedNum: feed.id});
  }

  const closeFeed = (e) => {
    if(e.target.id == "myFeedModal"){
      openFeedModal({openFeedModalNum: 0});
    }
  }

  return (
    <div>
      <MyFeedModal feed={feed} openFeedModalNum={openFeedModalNum} feedDetail={feedDetail} closeFeed={closeFeed}/>
      <div className={cx("myFeed-item")} onClick={openFeed}>
        <img src={imgUrl} alt="feed"/>
      </div>
    </div>
  );
  
};



export default MyFeedItem;