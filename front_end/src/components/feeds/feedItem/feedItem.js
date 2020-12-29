import React from "react";
import styles from "./feedItem.scss";
import classNames from "classnames/bind";
import like_img from '../../../image/like.jpg';
import comment_img from '../../../image/comment.jpg';
import message_img from '../../../image/message.jpg';
import share_img from '../../../image/share.jpg';

const cx = classNames.bind(styles);

const FeedItem = ({
  feed
}) => {
  return (
    <div className={cx("feed-item")}>
        <div className={cx("feed-header")}>
          <div className={cx("profile-imagebox")}>
            <img className={cx("profile-image")} src="https://placeimg.com/32/32/people"  alt="profile image"/>
          </div>
          <div className={cx("profile-text")}>
            <div className={cx("profile-name")}>Hong</div>
            {/* <div className={cx("feed-place")}>서울</div> */}
          </div>
          <div className={cx("feed-add")}>&middot;&middot;&middot;</div>
        </div>
        <div className={cx("feed-images")}>
          <img src="https://placeimg.com/600/600/nature" alt="feed image"/>
        </div>
        <div className={cx("feed-contents")}>
          <div className={cx("buttonbox")}>
            <span className={cx("like")}><img src={like_img} alt="like"></img></span>
            <span className={cx("comment")}><img src={comment_img} alt="comment"></img></span>
            <span className={cx("message")}><img src={message_img} alt="message"></img></span>
            <span className={cx("share")}><img src={share_img} alt="share"></img></span>
          </div>
          <div className={cx("likes_count")}>좋아요 18개</div>
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