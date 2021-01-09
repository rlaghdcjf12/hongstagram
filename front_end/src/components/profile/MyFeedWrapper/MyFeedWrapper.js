import React from "react";
import styles from "./MyFeedWrapper.scss";
import classNames from "classnames/bind";
import {BiTv, BiTable, BiUserPin} from "react-icons/bi"
import {IoBookmarkOutline} from "react-icons/io5"

const cx = classNames.bind(styles);

const MyFeedWrapper = ({ menuNum, changeProfileTab, children }) => {
  const changeTab = e => {
    console.log("click" + e.id);
    changeProfileTab({ num: e.id });
  };

  return (
    <div className={cx("myFeedWrapper")}>
      <div className={cx("myFeedMenu")}>
        <div id="0" className={cx("myFeedContents", menuNum === "0" ? "active" : "")} onClick={changeTab}><BiTable /> 게시물</div>
        <div id="1" className={cx("myFeedContents", menuNum === "1" ? "active" : "")} onClick={changeTab(1)}><BiTv /> IGTV</div>
        <div id="2" className={cx("myFeedContents", menuNum === "2" ? "active" : "")} onClick={changeTab(2)}><IoBookmarkOutline /> 저장됨</div>
        <div id="3" className={cx("myFeedContents", menuNum === "3" ? "active" : "")} onClick={changeTab(3)}><BiUserPin /> 태그됨</div>
      </div>
        {children}
    </div>
  );
};

export default MyFeedWrapper;