import React from "react";
import styles from "./MyFeedModal.scss";
import classNames from "classnames/bind";
import MyFeedItem from "../MyFeedItem";

const cx = classNames.bind(styles);

const MyFeedModal = ( {feed, openFeedModalNum, owner, closeFeed} ) => {
  const imgUrl = feed.image.replace("http://localhost:8000/front_end/public","");

  let owner_image = owner.profileImage;
  if(owner_image !== undefined){
    owner_image = (owner_image).replace("http://localhost:8000/front_end/public","");
  }

  return (
      <div id="myFeedModal" className={cx("myFeedModal", openFeedModalNum == feed.id ? "" : "closed")} onClick={closeFeed}>
        <div className={cx("myFeedPopUp")}>
          <div className={cx("imageSector")}>
            <img src={imgUrl} alt="feed"/>
          </div>

          <div className={cx("contentsSector")}>
            <div className={cx("contentsSector-title")}>
              <div className={cx("contentsWrapper")}>
                <div className={cx("title-imageBox")}>
                  <img src={owner_image}></img>
                </div>
                <div className={cx("title-textBox")}>
                  <div className={cx("title-textBox-name")}>{owner.nickname}</div>
                  <div className={cx("title-textBox-place")}>{feed.place}</div>
                </div>
              </div>
            </div>
            <div className={cx("contentsSector-body")}>
              <div className={cx("contentsWrapper")}>
                <div className={cx("contentsSector-description")}>
                  <div className={cx("body-imageBox")}>
                    <img src={owner_image}></img>
                  </div>
                  <div className={cx("body-textBox")}>
                    <span className={cx("body-textBox-name")}>{owner.nickname}</span> {feed.text}</div>
                </div>
                <div className={cx("contentsSector-comments")}>
                </div>
                <div className={cx("contentsSector-comments")}>
                </div>
              </div>
            </div>
            
            
            <div className={cx("contentsSector-details")}>
              <div className={cx("contentsWrapper")}>
                
              </div>
            </div>
            <div className={cx("contentsSector-comment_input")}>
              <div className={cx("contentsWrapper")}>
                
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default MyFeedModal;