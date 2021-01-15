import React from "react";
import Button from "./Button";

const SignOut = ({ auth }) => {
  return (
    auth.currentUser && (
      <div className="sign-out">
        <Button action={() => auth.signOut()} text="Sign Out" />
      </div>
    )
  );
};

export default SignOut;
