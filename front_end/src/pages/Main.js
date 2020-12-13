import React from "react";
import MainStructure from "../components/structure/MainStructure";
import InsertForm from "../components/notes/InsertForm";
import NoteWrapper from "../components/notes/NoteWrapper";
import NoteContainer from "../containers/NoteContainers";

const Main = () => {
  return (
    <MainStructure>
        <NoteWrapper>
            <NoteContainer />
        </NoteWrapper>
    </MainStructure>
  );
};

export default Main;