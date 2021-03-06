import React from "react";
import styles from "./AuthForm.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import fb_img from '../../../image/fb_small.png';
import gp_img from '../../../image/googleplay.png';
import as_img from '../../../image/appstore.png';

const cx = classNames.bind(styles);

const AuthForm = ({
  onChangeInput,
  email,
  nickname,
  username,
  password,
  onRegister,
  error
}) => {
  const handleChange = e => {
    const { name, value } = e.target;
    onChangeInput({ name, value });
  };

  const handleKeyPress = e => {
    if (e.key === "Enter") {
      onRegister();
      return;
    }
  };

  return (
    <div className={cx("auth-set")}>
      <div className={cx("auth-form")}>
        <div className={cx("title")}>Hongstagram</div>
          <div className={cx("inputWrapper", email === "" ? "" : "up")}>
            {email === "" ?  (<div></div>) : (<div className={cx("placeholder")}>이메일 주소</div>)}
            <input type="email" name="email" value={email} onChange={handleChange} onKeyPress={handleKeyPress} placeholder="이메일 주소"></input>
          </div>
          <div className={cx("inputWrapper", nickname === "" ? "" : "up")}>
          {nickname === "" ?  (<div></div>) : (<div className={cx("placeholder")}>성명</div>)}
            <input type="nickname" name="nickname" value={nickname} onChange={handleChange} onKeyPress={handleKeyPress} placeholder="성명"></input>
          </div>
        <div className={cx("inputWrapper", username === "" ? "" : "up")}>
          {username === "" ?  (<div></div>) : (<div className={cx("placeholder")}>사용자 이름</div>)}
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            placeholder="사용자 이름"
          />
        </div>
        <div className={cx("inputWrapper", password === "" ? "" : "up")}>
          {password === "" ?  (<div></div>) : (<span className={cx("placeholder")}>비밀번호</span>)}
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            placeholder="비밀번호"
          />
        </div>
        
        <div className={cx("auth-button", username !== "" && password !== "" ? "possible" : "")} onClick={onRegister}>
          가입
        </div>
        <div className={cx("or_box")}>
          <div className={cx("or_line")} />
          <div className={cx("or")}>또는</div>
          <div className={cx("or_line")} />
        </div>
        <div className={cx("fb_box")}>
          <img src={fb_img} alt="facebook"/>
          &nbsp;Facebook으로 로그인
        </div>
        <div className={cx("error")}>
          {error.triggered && (
            <div className={cx("message")}>{error.message}</div>
          )}
        </div>
        <div className={cx("pw_forget_box")}>
          비밀번호를 잊으셨나요?
        </div>
      </div>
      <div className={cx("transition_box")}>
        <div className={cx("link_box")}>
          <span className={cx("description")}>계정이 있으신가요?  </span>
          <Link to={`/auth/login`} className={cx("link")}>
            로그인
          </Link>
        </div>
      </div>
      <div className={cx("app_box")}>
        <div className={cx("app_text")}>앱을 다운로드하세요.</div>
        <div className={cx("app_button_list")}>
          <a href="https://apps.apple.com/app/instagram/id389801252?vt=lo"><img src={as_img} alt="App Store"/></a>
          <a href="https://play.google.com/store/apps/details?id=com.instagram.android"><img src={gp_img} alt="Google Play"/></a>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;