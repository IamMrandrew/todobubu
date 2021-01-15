import React from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const SignIn = ({ auth }) => {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  return (
    <div className="sign-in">
      <button onClick={signInWithGoogle}>Sign In</button>
    </div>
  );
};

export default SignIn;
