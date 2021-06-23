import React from "react";
import styles from "./Header.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { IoHomeOutline, IoHomeSharp, IoBookmarkOutline, IoSettingsOutline } from "react-icons/io5";
import { VscAccount } from "react-icons/vsc"
import { HiOutlineRefresh } from "react-icons/hi"


const cx = classNames.bind(styles);

const Header = ({ onLogout, profileDropdown, profileImage, dropDownFlag }) => {
  const Dropdown = () => {
    profileDropdown({dropDownFlag});
  }
  var imgUrl = null;
  if(profileImage !== null) imgUrl = profileImage.replace("http://localhost:8000/front_end/public","");

  return (
    <div className={cx("header")}>
      <div className={cx("header-contents")}>
        <div className={cx("left_icons")}>
          <Link to={"/"} className={cx("logo")}>
            Hongstagram
          </Link>
        </div>
        <div className={cx("center_searchbar")}>
        </div>
        <div className={cx("right_icons")}>
          <div className={cx("home")}>
            <Link to={"/"}>
              {window.location.href === "http://" + window.location.host + "/" ? <IoHomeSharp/> : <IoHomeOutline/>}
            </Link>
          </div>
          <div className={cx("menu-profile")} onClick={Dropdown}>
            {imgUrl !== null ? 
              <img src={imgUrl} alt="profile"/>
              : <img src={require("../../../image/default-profile.jpg").default} alt="profile"/>
            }
            
            {/* <Link to={"/profile"}>
                
            </Link> */}
          </div>
          <div className={cx("dropdown_position")}>
            <div className={cx("dropdown_menu", dropDownFlag === "open" ? "" : "hidden")} onClick={Dropdown}>
              <ul>
                <li>
                  <Link to={"/Profile"}><span><VscAccount/></span> &nbsp;프로필</Link>
                </li>
                <li><span className={cx("font-bold")}><IoBookmarkOutline/></span> &nbsp;저장됨</li>
                <li><span className={cx("font-bold")}><IoSettingsOutline/></span> &nbsp;설정</li>
                <li><span className={cx("font-bold")}><HiOutlineRefresh/></span> &nbsp;계정 전환</li>
                <li className={cx("last_menu")} onClick={onLogout}> 로그아웃</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;