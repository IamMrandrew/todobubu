import React from "react";

const SignOut = ({ auth }) => {
  return (
    auth.currentUser && (
      <div className="sign-out">
        <button onClick={() => auth.signOut()}>Sign Out</button>
      </div>
    )
  );
};

export default SignOut;
