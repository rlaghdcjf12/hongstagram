import React from "react";
import styles from "./MyFeedWrapper.scss";
import classNames from "classnames/bind";
import {BiTv, BiTable, BiUserPin} from "react-icons/bi"
import {IoBookmarkOutline} from "react-icons/io5"

const cx = classNames.bind(styles);

const MyFeedWrapper = ({ menuNum, changeProfileTab, children }) => {
  const changeTab = (e) => {
    e.preventDefault();
    console.log("click e : " + e);
    //console.log("click this : " + this);
    changeProfileTab({ num: e });
  };

  return (
    <div className={cx("myFeedWrapper")}>
      <div className={cx("myFeedMenu")}>
        <div id="0" className={cx("myFeedContents", menuNum === "0" ? "active" : "")} onClick={changeProfileTab("0")}><BiTable /> 게시물</div>
        <div id="1" className={cx("myFeedContents", menuNum === "1" ? "active" : "")} onClick={(id) => changeTab(id)}><BiTv /> IGTV</div>
        <div id="2" className={cx("myFeedContents", menuNum === "2" ? "active" : "")} onClick={(id) => changeTab(id)}><IoBookmarkOutline /> 저장됨</div>
        <div id="3" className={cx("myFeedContents", menuNum === "3" ? "active" : "")} onClick={(id) => changeTab(id)}><BiUserPin /> 태그됨</div>
      </div>
        {children}
    </div>
  );
};

export default MyFeedWrapper;