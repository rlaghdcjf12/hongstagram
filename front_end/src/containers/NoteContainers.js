import React, { Component } from "react";
import { connect } from "react-redux";
import InsertForm from "../components/notes/InsertForm";
import NoteWrapper from "../components/notes/NoteWrapper";

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

  render() {
    const { noteInput } = this.props;
    const { handleChange, addNote } = this;
    return (
      <div>
        <NoteWrapper>
          <InsertForm
            noteInput={noteInput}
            onChangeInput={handleChange}
            onAdd={addNote}
          />
        </NoteWrapper>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  noteInput: state.notes.noteInput,
  notes: state.notes.notes
});

const mapDispatchToProps = dispatch => {
  return {
    changeNoteInput: ({ value }) => {
      dispatch(noteActions.changeNoteInput({ value }));
    },
    addNote: () => {
      dispatch(noteActions.addNote());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NoteContainer);