import React from "react";
import styles from "./MyFeedModal.scss";
import classNames from "classnames/bind";
import like_img from '../../../image/like.jpg';
import comment_img from '../../../image/comment.jpg';
import share_img from '../../../image/share.jpg';
import save_img from '../../../image/save.jpg';
import emo_img from '../../../image/emoticon.jpg';
import ModalSubMenu from '../ModalSubMenu';

const cx = classNames.bind(styles);

const MyFeedModal = ( {feed, currentFocus, closeFeed, openSubMenu, DeletePopup, DeleteFeed, handleDelete} ) => {
  let imgUrl;
  if(feed.image !== null){
    imgUrl = feed.image.replace("http://localhost:8000/front_end/public","")
  }

  let owner_image = currentFocus.owner.profileImage;
  if(owner_image !== undefined){
    owner_image = (owner_image).replace("http://localhost:8000/front_end/public","");
  }

  const openSubMenuModal = () => {
    openSubMenu({openFlag: "open"});
  }

  const closeSubMenuModal = () => {
    openSubMenu({openFlag: "close"});
    DeletePopup({deletePopupFlag : "no"});
  }

  const SubMenuBackgroundClick = (e) => {
    if(e.target.id === "ModalSubMenu"){
      closeSubMenuModal();
    }
  }

  const handleDeleteFeedClose = () => {
    closeSubMenuModal();
    handleDelete();
  }

  return (
      <div id="myFeedModal" className={cx("myFeedModal", currentFocus.openFeedModalNum === feed.id ? "" : "closed")} onClick={closeFeed}>
        <div className={cx("myFeedPopUp")}>
          <div className={cx("imageSector")}>
            <img src={imgUrl} alt="feed"/>
          </div>

          <div className={cx("contentsSector")}>
            <div className={cx("contentsSector-title")}>
              <div className={cx("contentsWrapper")}>
                <div className={cx("title-imageBox")}>
                  <img src={owner_image} alt="owner_image"></img>
                </div>
                <div className={cx("title-textBox")}>
                  <div className={cx("title-textBox-name")}>{currentFocus.owner.nickname}</div>
                  <div className={cx("title-textBox-place")}>{feed.place}</div>
                </div>
                {currentFocus.SubMenuOpenFlag === "open" ? 
                  <ModalSubMenu closeSubMenuModal={closeSubMenuModal} SubMenuBackgroundClick={SubMenuBackgroundClick}
                    DeletePopup={DeletePopup} DeleteFeed={DeleteFeed} handleDeleteFeedClose={handleDeleteFeedClose}
                    feed={feed} currentFocus={currentFocus}>
                  </ModalSubMenu>
                  : <div></div>
                }
                <div className={cx("title-menu")} onClick={openSubMenuModal}>&middot;&middot;&middot;</div>
              </div>
            </div>
            <div className={cx("contentsSector-body")}>
              <div className={cx("contentsWrapper")}>
                <div className={cx("contentsSector-description")}>
                  <div className={cx("body-imageBox")}>
                    <img src={owner_image} alt="owner_image"></img>
                  </div>
                  <div className={cx("body-textBox")}>
                    <span className={cx("body-textBox-name")}>{currentFocus.owner.nickname}</span> {feed.text}</div>
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
                  <div className={cx("likes_count")}><span className={cx("strong")}>한슬</span>님 <span className={cx("strong")}>외 36명</span>이 좋아합니다.</div>
                  <div className={cx("feed-created")}>19시간 전</div>
                </div>
              </div>
            </div>
            <div className={cx("contentsSector-comment_input")}>
              <div className={cx("contentsWrapper")}>
                <div className={cx("comment_input-emoticon_button")}><img src={emo_img} alt="emo_image"></img></div>
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