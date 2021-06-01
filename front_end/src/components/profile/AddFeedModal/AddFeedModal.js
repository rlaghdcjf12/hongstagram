import React from "react";
import styles from "./AddFeedModal.scss";
import classNames from "classnames/bind";
import like_img from '../../../image/like.jpg';
import comment_img from '../../../image/comment.jpg';
import share_img from '../../../image/share.jpg';
import save_img from '../../../image/save.jpg';
import emo_img from '../../../image/emoticon.jpg';

const cx = classNames.bind(styles);

const AddFeedModal = ( {openFeedModalNum, myInfo, closeFeed, imagePreview} ) => {

  let owner_image = myInfo.profileImage;
  if(owner_image !== null){
    owner_image = (owner_image).replace("http://localhost:8000/front_end/public","");
  }

  const setState= ({file, previewURL}) => {
    console.log("file : ", file, ", URL : ", previewURL);
    imagePreview({
      file: file,
      url: previewURL
    });
  }

  const handleFileOnChange = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      setState({
        file : file,
        url : reader.result
      })
    }
    reader.readAsDataURL(file);
  }

  return (
      <div id="myFeedModal" className={cx("myFeedModal", openFeedModalNum === -1 ? "" : "closed")} onClick={closeFeed}>
        <div className={cx("myFeedPopUp")}>
          <div className={cx("imageSector")}>
          <input type='file' 
            accept='image/jpg,impge/png,image/jpeg,image/gif' 
            name='profile_img' 
            onChange={handleFileOnChange}>
          </input>
            {/* <img src={imgUrl} alt="feed"/> */}
          </div>

          <div className={cx("contentsSector")}>
            <div className={cx("contentsSector-title")}>
              <div className={cx("contentsWrapper")}>
                <div className={cx("title-imageBox")}>
                  <img src={owner_image}></img>
                </div>
                <div className={cx("title-textBox")}>
                  <div className={cx("title-textBox-name")}>{myInfo.nickname}</div>
                  <div className={cx("title-textBox-place")}><input placeholder="place"></input></div>
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
                    <span className={cx("body-textBox-name")}>{myInfo.nickname}</span> <input></input>
                  </div>
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
                  <div className={cx("likes_count")}>좋아요 0개</div>
                  <div className={cx("feed-created")}>0분 전</div>
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

export default AddFeedModal;