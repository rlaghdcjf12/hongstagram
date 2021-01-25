import React from "react";
import styles from "./MyFeedWrapper.scss";
import classNames from "classnames/bind";
import {BiTv, BiTable, BiUserPin} from "react-icons/bi"
import {IoBookmarkOutline} from "react-icons/io5"
import MyFeedTab from "../MyFeedTab"

const cx = classNames.bind(styles);

const MyFeedWrapper = ({ menuNum, changeProfileTab, children }) => {
<<<<<<< HEAD
  return (
    <div className={cx("myFeedWrapper")}>
      <div className={cx("myFeedMenu")}>
        <MyFeedTab menuNum = {menuNum} id = "0" changeProfileTab={changeProfileTab}><BiTable /> 게시물</MyFeedTab>
        <MyFeedTab menuNum = {menuNum} id = "1" changeProfileTab={changeProfileTab}><BiTv /> IGTV</MyFeedTab>
        <MyFeedTab menuNum = {menuNum} id = "2" changeProfileTab={changeProfileTab}><IoBookmarkOutline /> 저장됨</MyFeedTab>
        <MyFeedTab menuNum = {menuNum} id = "3" changeProfileTab={changeProfileTab}><BiUserPin /> 태그됨</MyFeedTab>
=======
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
>>>>>>> 824430593e26d617d06eb9d3ebc2edcf78f56919
      </div>
      <div className={cx("myFeedContents")}>
        {children}
      </div>
    </div>
  );
};

export default MyFeedWrapper;