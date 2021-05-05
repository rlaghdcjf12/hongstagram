import React from "react";
import styles from "./MyFeedTab.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const MyFeedTab = ({ menuNum, id, changeProfileTab, children }) => {

  const changeTab = () => {
    changeProfileTab({ menuNum: id });
  };

  return (
    <div className={cx("myFeedTab", menuNum === id && "active")} onClick={changeTab}>
      {children}
    </div>
  );
};

export default MyFeedTab;