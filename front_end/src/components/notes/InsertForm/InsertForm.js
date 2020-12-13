import React from "react";
import styles from "./InsertForm.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const InsertForm = ({ noteInput, onChangeInput, onAdd }) => {
  const handleChange = e => {
    const { value } = e.target;
    onChangeInput({ value });
  };

  const handleKeyPress = e => {
    if (e.key === "Enter") {
      onAdd();
    }
  };

  return (
    <div className={cx("form")}>
      <div className={cx("title")}>Insert Your Note Here...</div>
      <input
        type="text"
        name="note"
        value={noteInput}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
      />
    </div>
  );
};

export default InsertForm;