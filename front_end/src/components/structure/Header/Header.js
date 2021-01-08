import React from "react";
import styles from "./Header.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { MdLock } from "react-icons/md";

const cx = classNames.bind(styles);

const Header = ({ onLogout, profileImage }) => {
  const imgUrl = profileImage.replace("http://localhost:8000/front_end/public","")
  return (
    <div className={cx("header")}>
      <div className={cx("header-contents")}>
        <Link to={"/Timeline"} className={cx("logo")}>
          Hongstagram
        </Link>
        <div className={cx("logout")}>
          <MdLock onClick={onLogout} />
        </div>
        <div className={cx("menu-profile")}>
          <Link to={"/profile"}>
            <img src={imgUrl} alt="menu-profile" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;