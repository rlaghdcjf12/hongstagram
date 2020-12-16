import React from "react";
import styles from "./NoteList.scss";
import classNames from "classnames/bind";
import NoteItem from "../../../components/notes/NoteItem";

const cx = classNames.bind(styles);

const NoteList = ({ notes, editing, onToggle }) => {
  const noteList = notes.map((note, i) => {
    return <NoteItem 
             note={note} 
             key={note.id} 
             editing={editing}
             onToggle={onToggle} />;
  });
  return (
    <div className={cx("note-list")}>
      <div className={cx("title")}>Your Notes...</div>
      {noteList}
    </div>
  );
};

export default NoteList;