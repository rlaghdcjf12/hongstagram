import React from "react";
import styles from "./AddFeedModal.scss";
import classNames from "classnames/bind";
import like_img from '../../../image/like.jpg';
import comment_img from '../../../image/comment.jpg';
import share_img from '../../../image/share.jpg';
import save_img from '../../../image/save.jpg';
import emo_img from '../../../image/emoticon.jpg';

const cx = classNames.bind(styles);

const AddFeedModal = ( {closeFeed, imagePreview, addFeedModal, currentFocus, myInfo, onChangeInput} ) => {
  
  let owner_image = myInfo.profileImage;
  if(owner_image !== null){
    owner_image = (owner_image).replace("http://localhost:8000/front_end/public","");
  }

  const setState= ({addFeed_previewURL}) => {
    imagePreview({ addFeed_previewURL: addFeed_previewURL });
  }
  
  const handleFileOnChange = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      setState({
        //file : file,
        addFeed_previewURL : reader.result
      })
    }
    reader.readAsDataURL(file);
  }

  const textInputChange = (e) => {
    const { name, value } = e.target;
    onChangeInput({ name, value });
  }

  return (
      <div id="myFeedModal" className={cx("myFeedModal", currentFocus.openFeedModalNum === -1 ? "" : "closed")} onClick={closeFeed}>
        <div className={cx("myFeedPopUp")}>
          <div className={cx("imageSector")}>
            {addFeedModal.previewURL === "" ? 
              <div>
                <label for="profile_img" className={cx("inputButton-file")}> + </label>
                <input type='file' 
                  accept='image/jpg,impge/png,image/jpeg,image/gif' 
                  id='profile_img' 
                  onChange={handleFileOnChange}>
                </input>
              </div> :
              <img src={addFeedModal.addFeed_previewURL} alt="feed"/>
            }
          </div>
          <div className={cx("contentsSector")}>
            <div className={cx("contentsSector-title")}>
              <div className={cx("contentsWrapper")}>
                <div className={cx("title-imageBox")}>
                  <img src={owner_image}></img>
                </div>
                <div className={cx("title-textBox")}>
                  <div className={cx("title-textBox-name")}>{myInfo.nickname}</div>
                  <div className={cx("title-textBox-place")}>
                    <input type="text"
                      placeholder="장소 입력" 
                      name="addFeed_place"
                      value={addFeedModal.addFeed_place}
                      onChange={textInputChange}>
                    </input>
                  </div>
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
                    <span className={cx("body-textBox-name")}>{myInfo.nickname}</span>
                    <input type="text"
                      placeholder="문구 입력..." 
                      name="addFeed_description"
                      value={addFeedModal.addFeed_description}
                      onChange={textInputChange}>
                    </input>
                  </div>
                </div>
              </div>
            </div>
            <div className={cx("contentsSector-footer")}>
              <div className={cx("add_button-submit")}>업 로 드</div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default AddFeedModal;