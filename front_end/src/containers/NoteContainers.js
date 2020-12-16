import React, { Component } from "react";
import { connect } from "react-redux";
import InsertForm from "../components/notes/InsertForm";
import NoteWrapper from "../components/notes/NoteWrapper";
import NoteList from "../components/notes/NoteList/NoteList";

import * as noteActions from "../store/modules/notes";

export class NoteContainer extends Component {
  handleChange = ({ value }) => {
    const { changeNoteInput } = this.props;
    changeNoteInput({ value });
  };

  addNote = () => {
    const { addNote } = this.props;
    addNote();
  };

  componentDidMount() {
    this.getNotes();
  }

  getNotes = () => {
    const { getNotes } = this.props;
    getNotes();
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

  render() {
    const { noteInput, error, notes, editing } = this.props;
    const { handleChange, addNote, handleToggle } = this;
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
              onToggle={handleToggle} />
        </NoteWrapper>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  noteInput: state.notes.noteInput,
  notes: state.notes.notes,
  error: state.notes.error,
  // editing state 추가
  editing: state.notes.editing
});

const mapDispatchToProps = dispatch => {
  return {
    changeNoteInput: ({ value }) => {
      dispatch(noteActions.changeNoteInput({ value }));
    },
    addNote: () => {
      dispatch(noteActions.addNote());
    },
    getNotes: () => {
      dispatch(noteActions.getNotes());
    },
    // toggle 함수 추가
    toggleNote: ({ id, text }) => {
      dispatch(noteActions.toggleNote({ id, text }));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NoteContainer);