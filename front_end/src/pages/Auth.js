import React from "react";
import AuthContainer from "../containers/AuthContainer";
import AuthWrapper from "../components/auth/AuthWrapper/AuthWrapper";

const Auth = ({ match }) => {
  const { kind } = match.params;
  return (
    <AuthWrapper>
      <AuthContainer kind={kind} />
    </AuthWrapper>
  );
};

export default Auth;