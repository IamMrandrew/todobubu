import React from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import Button from "./Button";

const SignIn = ({ auth }) => {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  return (
    <div className="sign-in">
      <Button action={signInWithGoogle} text="" />
    </div>
  );
};

export default SignIn;
