import React from "react";
import styles from "./NotFound.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const NotFound = () => (
  <div className={cx("not-found")}>
    <div className={cx("top-message")}>
      <h2>죄송합니다. 페이지를 사용할 수 없습니다.</h2>
      <div className={cx("bottom-message")}>
        클릭하신 링크가 잘못되었거나 페이지가 삭제되었습니다.
        <a href="/"> Hongstagram으로 돌아가기</a>
      </div>
    </div>
  </div>
);

export default NotFound;