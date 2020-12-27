import React from "react";
import MainStructure from "../components/structure/MainStructure";
import NoteContainer from "../containers/NoteContainers";

const Main = () => {
  return (
    <MainStructure>
        <NoteContainer />
    </MainStructure>
  );
};

export default Main;