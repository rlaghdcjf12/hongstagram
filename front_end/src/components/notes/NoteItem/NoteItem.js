import React from "react";
import styles from "./NoteItem.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const NoteItem = ({ note, editing, onToggle }) => {
  const handleToggle = () => {
    onToggle({ id: note.id, text: note.text });
  };
  return (
    <div
      className={cx("note-item", editing.id === note.id && "editing")}
      onClick={handleToggle}
    >
      <div className={cx("note")}>{note.text}</div>
      <div className={cx("delete")}>&times;</div>
    </div>
  );
};

export default NoteItem;