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

  const signInWithGithub = () => {
    const provider = new firebase.auth.GithubAuthProvider();
    auth.signInWithPopup(provider);
  };

  return (
    <div className="sign-in">
      <Button action={signInWithGoogle} text="" provider="Google" />
      <Button action={signInWithGithub} text="" provider="Github" />
    </div>
  );
};

export default SignIn;
