import { useContext, useRef, useState } from "react";
import AuthContext from "../../Store/auth-context";

import { useHistory } from "react-router-dom";

import classes from "./AuthForm.module.css";

const AuthForm = () => {
  const history=useHistory();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoding, setIsLoading] = useState(false);

  let emailInputRef = useRef();
  let passwordInputRef = useRef();

  const authCtx = useContext(AuthContext);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
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
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res)=>{
      setIsLoading(false);
      if(res.ok){
        return res.json();
      } else {
        return res.json().then((data)=>{
          let errorMessage = "Authentication Failed....";
          throw new Error(errorMessage);
        });
      }
    })
    .then((data)=>{
      authCtx.login(data.idToken);
      history.replace('/profile')
    })
    .catch((err)=>{
      alert(err.message)
    })
  }

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
