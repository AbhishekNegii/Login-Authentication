import { useContext, useRef, useState } from "react";
import AuthContext from "../../Store/auth-context";

import classes from "./AuthForm.module.css";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoding, setIsLoading] = useState(false);

  let emailInputRef = useRef();
  let passwordInputRef = useRef();

  const authCtx=useContext(AuthContext)

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    setIsLoading(true);
    let url;
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCCXzhbX-HRm-ujGbrRU7-ynAlPT4t8HTY";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCCXzhbX-HRm-ujGbrRU7-ynAlPT4t8HTY";
    }
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      setIsLoading(false);
      const data = await response.json();
      
        let errorMessage = "Authentication Failed....";
        if (data && data.error && data.error.message) {
          errorMessage = data.error.message;
        }
        // throw new Error(error.message)
        alert(errorMessage);
        // console.log(data);
        authCtx.login(data.idToken)
        // console.log(data.idToken)
      
    } catch (error) {
      console.log(error.message);
    }
    
  };
  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          {!isLoding && <button>{isLogin ? "Login" : "Create Account"}</button>}
          {isLoding && <p>Sending request....</p>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
