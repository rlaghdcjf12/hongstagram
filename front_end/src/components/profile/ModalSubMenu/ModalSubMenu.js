import React from "react";
import styles from "./ModalSubMenu.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

const ModalSubMenu = ( {feedId, currentFocus, closeSubMenuModal, SubMenuBackgroundClick, DeletePopup, handleDeleteFeedClose} ) => {
  const DeleteCheck = () => {
    DeletePopup({deletePopupFlag : "yes"});
  }

  return (
      <div id="ModalSubMenu" className={cx("ModalSubMenu")} onClick={SubMenuBackgroundClick}>
        {currentFocus.deletePopupFlag === "no" ? 
          <div className={cx("SubMenuPopUp")}>
            <div className={cx("SubMenu-HighLight", "NoEnd")} onClick={DeleteCheck}>삭제</div>
            <div className={cx("SubMenu-Normal", "NoEnd")} onClick={closeSubMenuModal}><Link to={"/feedPage/"+feedId}>게시물로 이동</Link></div>
            <div className={cx("SubMenu-Normal", "NoEnd")}>공유 대상...</div>
            <div className={cx("SubMenu-Normal", "NoEnd")}>링크 복사</div>
            <div className={cx("SubMenu-Normal", "NoEnd")}>퍼가기</div>
            <div className={cx("SubMenu-Normal")} onClick={closeSubMenuModal}>취소</div>
          </div>
        : <div className={cx("SubMenuPopUp", "DeletePopUp")}>
            <div className={cx("DeletePopUp-Notice")}>
              <div className={cx("DeletePopUp-Strong")}>게시물을 삭제할까요?</div>
              <div className={cx("DeletePopUp-Normal", "NoEnd")}>이 게시물을 삭제하시겠어요?</div>
            </div>
            <div className={cx("SubMenu-HighLight", "NoEnd")} onClick={handleDeleteFeedClose}>삭제</div>
            <div className={cx("SubMenu-Normal")} onClick={closeSubMenuModal}>취소</div>
          </div>
        }
      </div>
  );
}

export default ModalSubMenu;