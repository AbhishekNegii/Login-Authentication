import { useContext, useRef } from "react";
import AuthContext from "../../Store/auth-context";
import classes from "./ProfileForm.module.css";

const ProfileForm = () => {
  const updatedInputRef = useRef();

  const authCtx = useContext(AuthContext);

  const passwordChangeHandler = async (e) => {
    e.preventDefault();
    const updatedPassword = updatedInputRef.current.value;

    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCCXzhbX-HRm-ujGbrRU7-ynAlPT4t8HTY",
      {
        method: "POST",
        body: JSON.stringify( {
          idToken: authCtx.token,
          password: updatedPassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log("Hi")
    console.log(data);
  };

  return (
    <form className={classes.form} onClick={passwordChangeHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" minLength="6" ref={updatedInputRef} />
      </div>
      <div className={classes.action}>
        <button >Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
