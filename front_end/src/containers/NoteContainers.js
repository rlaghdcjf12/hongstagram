import React, { Component } from "react";
import { connect } from "react-redux";
import InsertForm from "../components/notes/InsertForm";
import NoteWrapper from "../components/notes/NoteWrapper";
import NoteList from "../components/notes/NoteList/NoteList";

import * as noteActions from "../store/modules/notes";

export class NoteContainer extends Component {
  handleChange = ({ value }, isEditing) => {
    const { changeNoteInput } = this.props;
    changeNoteInput({ value }, isEditing);
  };

  addNote = () => {
    const { addNote } = this.props;
    addNote();
  };

  componentDidMount() {
    this.getNotes();
    // 스크롤링 이벤트 추가
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    // 언마운트 될때에, 스크롤링 이벤트 제거
    window.removeEventListener("scroll", this.handleScroll);
  }

  getNotes = () => {
    const { getNotes } = this.props;
    getNotes();
  };

  updateNote = () => {
    const { updateNote } = this.props;
    updateNote();
  };

  deleteNote = ({ id }) => {
    const { deleteNote } = this.props;
    deleteNote({ id });
  };

  // 토글하는 함수 추가
  handleToggle = ({ id, text }) => {
    const { toggleNote, editing } = this.props;
  // 이미 에디팅 중이면 한번 더 토글시 초기화
    if (editing.id === id) {
      toggleNote({ id: null, text: "" });
    } else {
      // 아니면 에디팅 표시.
      toggleNote({ id, text });
    }
  };

  handleScroll = () => {
    const { innerHeight } = window;
    const { scrollHeight } = document.body;
    const scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop;
    if (scrollHeight - innerHeight - scrollTop < 100) {
      if (!this.props.isLoading && !this.props.isLast) {
        const lastId = this.props.notes[this.props.notes.length - 1].id;
        this.props.getMoreNotes({ lastId });
      }
    }
  };

  render() {
    const { noteInput, error, notes, editing } = this.props;
    const {
      handleChange,
      addNote,
      handleToggle,
      updateNote,
      deleteNote
    } = this;
    return (
      <div>
        <NoteWrapper>
          <InsertForm
            noteInput={noteInput}
            onChangeInput={handleChange}
            onAdd={addNote}
            error={error}
          />
          <NoteList
            notes={notes}
            editing={editing}
            onToggle={handleToggle}
            onChange={handleChange}
            onUpdate={updateNote}
            onDelete={deleteNote}
          />
        </NoteWrapper>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  noteInput: state.notes.noteInput,
  notes: state.notes.notes,
  error: state.notes.error,
  editing: state.notes.editing,
  // 아래 추가.
  isLast: state.notes.isLast,
  isLoading: state.notes.isLoading
});

const mapDispatchToProps = dispatch => {
  return {
    changeNoteInput: ({ value }, isEditing) => {
      dispatch(noteActions.changeNoteInput({ value }, isEditing));
    },
    addNote: () => {
      dispatch(noteActions.addNote());
    },
    getNotes: () => {
      dispatch(noteActions.getNotes());
    },
    toggleNote: ({ id, text }) => {
      dispatch(noteActions.toggleNote({ id, text }));
    },
    updateNote: () => {
      dispatch(noteActions.updateNote());
    },
    deleteNote: ({ id }) => {
      dispatch(noteActions.deleteNote({ id }));
    },
    // 아래 추가.
    getMoreNotes: ({lastId}) => {
      dispatch(noteActions.getMoreNotes({lastId}));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NoteContainer);