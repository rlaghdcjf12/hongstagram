import React from "react";
import styles from "./ModalSubMenu.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const ModalSubMenu = ( {closeSubMenuModal, SubMenuBackgroundClick} ) => {

  return (
      <div id="ModalSubMenu" className={cx("ModalSubMenu")} onClick={SubMenuBackgroundClick}>
        <div className={cx("SubMenuPopUp")}>
          <div className={cx("SubMenu-HighLight", "NoEnd")}>삭제</div>
          <div className={cx("SubMenu-Normal", "NoEnd")}>게시물로 이동</div>
          <div className={cx("SubMenu-Normal", "NoEnd")}>공유 대상...</div>
          <div className={cx("SubMenu-Normal", "NoEnd")}>링크 복사</div>
          <div className={cx("SubMenu-Normal", "NoEnd")}>퍼가기</div>
          <div className={cx("SubMenu-Normal")} onClick={closeSubMenuModal}>취소</div>
        </div>
      </div>
  );
}

export default ModalSubMenu;