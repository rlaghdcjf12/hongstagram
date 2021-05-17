import React from "react";
import styles from "./MyFeedModal.scss";
import classNames from "classnames/bind";
import MyFeedItem from "../MyFeedItem";
import like_img from '../../../image/like.jpg';
import comment_img from '../../../image/comment.jpg';
import share_img from '../../../image/share.jpg';
import save_img from '../../../image/save.jpg';
import emo_img from '../../../image/emoticon.jpg';

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
                <div className={cx("title-menu")} >&middot;&middot;&middot;</div>
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
                <div className={cx("feed-contents")}>
                  <div className={cx("buttonbox")}>
                    <span className={cx("like")}><img src={like_img} alt="like"></img></span>
                    <span className={cx("comment")}><img src={comment_img} alt="comment"></img></span>
                    <span className={cx("share")}><img src={share_img} alt="share"></img></span>
                    <span className={cx("save")}><img src={save_img} alt="save"></img></span>
                  </div>
                  <div className={cx("likes_count")}><span className={cx("strong")}>수진</span>님 <span className={cx("strong")}>외 36명</span>이 좋아합니다.</div>
                  <div className={cx("feed-created")}>19시간 전</div>
                </div>
              </div>
            </div>
            <div className={cx("contentsSector-comment_input")}>
              <div className={cx("contentsWrapper")}>
                <div className={cx("comment_input-emoticon_button")}><img src={emo_img}></img></div>
                <div className={cx("comment_input-inputbox")}>댓글 달기...</div>
                <div className={cx("comment_input-submitbutton")}>게시</div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default MyFeedModal;