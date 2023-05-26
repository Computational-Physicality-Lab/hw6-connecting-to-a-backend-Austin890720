import React from "react";
import { Container } from "reactstrap";
import google from "../../assets/images/google-logo.png";
import "./Login.css";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { useNavigate } from "react-router-dom";
import routes from "../../shared/appRoutes";
import db from "../../index";

const Login = ({ user }) => {
  const navigate = useNavigate();
  const signInWithGoogle = () => {
    auth.signInWithPopup(provider).then(function () {
      firebase.auth().onAuthStateChanged(async (user) => {
        if (user) {
          const querySnapshot = await db
            .collection(user.uid)
            .orderBy("TimeStamp", "desc")
            .get();
          const documentsData = querySnapshot.docs.map((doc) => doc.data());
          let items = documentsData;
          sessionStorage.setItem("items", JSON.stringify(items));
        }
        navigate(routes.home);
        window.location.reload();
      });
    });
  };
  const signOutWithGoogle = () => {
    auth.signOut().then(function () {
      let items = [];
      sessionStorage.setItem("items", JSON.stringify(items));
      navigate(routes.home);
    });
  };
  return (
    <Container className="Login">
      <div className="login_box">
        {user == null ? (
          <button type="button" className="login" onClick={signInWithGoogle}>
            <img className="google" src={google} />
            <span className="login_text">Log In with Google</span>
          </button>
        ) : (
          <button type="button" className="login" onClick={signOutWithGoogle}>
            <span className="login_text">Log out as {user.displayName}</span>
          </button>
        )}
      </div>
    </Container>
  );
};

const firebaseConfig = {
  apiKey: "AIzaSyA2ueNdRwmGhBSjTMhoeGiECWqZy3BR-X0",
  authDomain: "ssui-hw6-7edff.firebaseapp.com",
  projectId: "ssui-hw6-7edff",
  storageBucket: "ssui-hw6-7edff.appspot.com",
  messagingSenderId: "370085147285",
  appId: "1:370085147285:web:6f3ca3d727fb344b1ce19c",
  measurementId: "G-C58GD0EEQH",
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export default Login;
