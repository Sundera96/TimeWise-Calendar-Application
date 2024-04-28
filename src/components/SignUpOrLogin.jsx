import React, { useState } from "react";
import "../css/signUpOrLogin.css";
import SignUpForm from "./SignUpForm";
import LoginForm from "./LoginForm";
export default function SignUpOrLogin() {
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSignUpClick = () => {
    setIsSignUp(true);
  };

  const handleLoginClick = () => {
    setIsSignUp(false);
  };

  const handleFormSubmit = (input) => {
    console.log(input);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-background"></div>
      <dialog open={true} className="dialog-container">
        <div>
          <div className="dialog-header">
            <h2>{isSignUp ? "Sign Up" : "Log In"}</h2>
          </div>
          <div className="form-container">
            {isSignUp ? (
              <div>
                <SignUpForm
                  handleLoginClick={handleLoginClick}
                  handleFormSubmit={handleFormSubmit}
                ></SignUpForm>
              </div>
            ) : (
              <div>
                <LoginForm handleSignUpClick={handleSignUpClick}></LoginForm>
              </div>
            )}
          </div>
        </div>
      </dialog>
    </div>
  );
}
