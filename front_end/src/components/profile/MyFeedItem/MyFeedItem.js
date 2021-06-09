import React from "react";
import styles from "./MyFeedItem.scss";
import MyFeedModal from "../MyFeedModal"
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const MyFeedItem = ({feed, openFeedModal, currentFocus, getFeedOwner, closeFeed, openSubMenu, DeletePopup, DeleteFeed}) => {
  let imgUrl;
  if(feed.image !== null){
    imgUrl = feed.image.replace("http://localhost:8000/front_end/public","")
  }

  const openFeed = () => {
    openFeedModal({openFeedModalNum: feed.id});
    getFeedOwner({feedNum: feed.id});
  }
  
  const handleDelete = () => {
    DeleteFeed({id: feed.id});
    openFeedModal({openFeedModalNum: 0});
  }

  return (
    <div>
      <MyFeedModal feed={feed} currentFocus={currentFocus} closeFeed={closeFeed} openSubMenu={openSubMenu} 
        DeletePopup={DeletePopup} DeleteFeed={DeleteFeed} handleDelete={handleDelete}/>
      <div className={cx("myFeed-item")} onClick={openFeed}>
        <img src={imgUrl} alt="feed"/>
      </div>
    </div>
  );
  
};



export default MyFeedItem;