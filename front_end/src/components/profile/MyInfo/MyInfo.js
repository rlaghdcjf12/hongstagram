import React from "react";
import styles from "./MyInfo.scss";
import classNames from "classnames/bind";
import {MdSettings} from "react-icons/md"

const cx = classNames.bind(styles);

const MyInfo = ( {myInfo, feeds} ) => {
  
  var imgUrl = null;
  if(myInfo.profileImage !== null) imgUrl = myInfo.profileImage.replace("http://localhost:8000/front_end/public","")
  return(
    <div className={cx("myInfoWrapper")}>
      <div className={cx("myInfoBox")}>
          <div className={cx("mainBox")}>
            <div className={cx("imageBox")}>
              <div className={cx("profile-image")}>
                {imgUrl !== null ? 
                  <img src={imgUrl} alt="profile"/>
                  : <img src={require("../../../image/default-profile.jpg").default} alt="profile"/>
                }
              </div>
            </div>
            {/* <div className={cx("infoBox")}>
                <div className={cx("nickname")}>{nickname}</div>
                <div className={cx("edit")}>설정</div>
            </div> */}
          </div>
          <div className={cx("subBox")}>
            <div className={cx("infoBox")}>
              <div className={cx("nickname")}>{myInfo.nickname}</div>
              <div className={cx("profile_edit")}><a className={cx("edit_button")} href="#">프로필 편집</a></div>
              <div className={cx("profile_setting")}><MdSettings className={cx("setting_button")}/></div>
            </div>
            <ul className={cx("InfoOuterBox")}>
              <li className={cx("infoInnerBox")}>
                <span className={cx("infoTitle")}>게시물
                  <span className={cx("infoContents")}> {feeds.length}</span>
                </span>
              </li>
              <li className={cx("infoInnerBox")}>
                <span className={cx("infoTitle")}>팔로워
                  <span className={cx("infoContents")}> 5</span>
                </span>
              </li>
              <li className={cx("infoInnerBox")}>
                <span className={cx("infoTitle")}>팔로우
                  <span className={cx("infoContents")}> 6</span>
                </span>
              </li>
            </ul>
            <div className={cx("textBox")}>
              <div className={cx("username")}>{myInfo.username}</div>
              <div className={cx("introduce")}>{myInfo.introduce}</div>
            </div>
          </div>
      </div>
    </div>
  );
};

export default MyInfo;