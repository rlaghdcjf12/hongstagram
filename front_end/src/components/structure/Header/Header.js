import React from "react";
import styles from "./Header.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { MdLock } from "react-icons/md";
import { IoHomeOutline, IoHomeSharp } from "react-icons/io5";

const cx = classNames.bind(styles);

const Header = ({ onLogout, profileImage }) => {
  const imgUrl = profileImage.replace("http://localhost:8000/front_end/public","")
  return (
    <div className={cx("header")}>
      <div className={cx("header-contents")}>
        <div className={cx("left_icons")}>
          <Link to={"/Timeline"} className={cx("logo")}>
            Hongstagram
          </Link>
        </div>
        <div className={cx("center_searchbar")}>
        </div>
        <div className={cx("right_icons")}>
          <div className={cx("home")}>
            <Link to={"/Timeline"}>
              {window.location.href === "http://" + window.location.host + "/Timeline" ? <IoHomeSharp/> : <IoHomeOutline/>}
            </Link>
          </div>
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
    </div>
  );
};

export default Header;