import React from "react";
import styles from "./MyFeedWrapper.scss";
import classNames from "classnames/bind";
import {BiTv, BiTable, BiUserPin} from "react-icons/bi"
import {IoBookmarkOutline} from "react-icons/io5"
import MyFeedTab from "../MyFeedTab"

const cx = classNames.bind(styles);

const MyFeedWrapper = ({ menuNum, changeProfileTab, children }) => {
  return (
    <div className={cx("myFeedWrapper")}>
      <div className={cx("myFeedMenu")}>
        <MyFeedTab menuNum = {menuNum} id = "0" changeProfileTab={changeProfileTab}><BiTable /> 게시물</MyFeedTab>
        <MyFeedTab menuNum = {menuNum} id = "1" changeProfileTab={changeProfileTab}><BiTv /> IGTV</MyFeedTab>
        <MyFeedTab menuNum = {menuNum} id = "2" changeProfileTab={changeProfileTab}><IoBookmarkOutline /> 저장됨</MyFeedTab>
        <MyFeedTab menuNum = {menuNum} id = "3" changeProfileTab={changeProfileTab}><BiUserPin /> 태그됨</MyFeedTab>
      </div>
      <div className={cx("myFeedContents")}>
        {children}
      </div>
    </div>
  );
};

export default MyFeedWrapper;