import React from "react";
import MainStructure from "../components/structure/MainStructure";
import FeedPageContainer from "../containers/FeedPageContainer";

const FeedPage = ({match}) => {
  const { feedId } = match.params;
  return (
    <MainStructure>
      <FeedPageContainer feedId={feedId}/>
    </MainStructure>
  );
};

export default FeedPage;