import React from "react";
import styles from "./feedItem.scss";
import classNames from "classnames/bind";
import like_img from '../../../image/like.jpg';
import comment_img from '../../../image/comment.jpg';
import share_img from '../../../image/share.jpg';
import save_img from '../../../image/save.jpg';

const cx = classNames.bind(styles);

const FeedItem = ({ feed }) => {
  let imgUrl;
  if(feed.image !== null){
    imgUrl = feed.image.replace("http://localhost:8000/front_end/public","")
  }

  return (
    <div className={cx("feed-item")}>
        <div className={cx("feed-header")}>
          <div className={cx("profile-imagebox")}>
            <img className={cx("profile-image")} src="https://placeimg.com/32/32/people"  alt="profile"/>
          </div>
          <div className={cx("header-text")}>
          {feed.place !== 'undefined' ? <div className={cx("profile-text")}>
              <div className={cx("profile-name")}>Hong</div>
              <div className={cx("feed-place")}>{feed.place}</div>
            </div> : <div className={cx("profile-nameonly")}>
              <div className={cx("profile-name")}>Hong</div>
            </div>}
            <div className={cx("feed-add")}>&middot;&middot;&middot;</div>
          </div>
        </div>
        <div className={cx("feed-images")}>
          <img src={imgUrl} alt="feed"/>
        </div>
        <div className={cx("feed-contents")}>
          <div className={cx("buttonbox")}>
            <span className={cx("like")}><img src={like_img} alt="like"></img></span>
            <span className={cx("comment")}><img src={comment_img} alt="comment"></img></span>
            <span className={cx("share")}><img src={share_img} alt="share"></img></span>
            <span className={cx("save")}><img src={save_img} alt="save"></img></span>
          </div>
          <div className={cx("likes_count")}>좋아요 367개</div>
          <div className={cx("feed-text")}>
            <b>Hong&nbsp;</b>
            <div> {feed.text}</div>
          </div>
          <div className={cx("feed-created")}>19시간 전</div>
          <div className={cx("feed-comments")}>
            <div className={cx("form-comments")}>댓글 달기...</div>
            <div className={cx("form-comments-submit")}>게시</div>
          </div>
        </div>
    </div>
  );
  
};



export default FeedItem;