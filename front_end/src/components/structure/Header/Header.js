import React from "react";
import styles from "./Header.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { MdLock } from "react-icons/md";

const cx = classNames.bind(styles);

const Header = ({ onLogout }) => (
  <div className={cx("header")}>
    <div className={cx("header-contents")}>
      <Link to={"/Timeline"} className={cx("logo")}>
        Hongstagram
      </Link>
      <div className={cx("logout")}>
        <MdLock onClick={onLogout} />
      </div>
    </div>
  </div>
);

export default Header;