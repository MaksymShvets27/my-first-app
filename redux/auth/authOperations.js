import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { useSelector } from "react-redux";
import { auth } from "../../firebase/config";
import { authSlice } from "./authReducer";

const { updateUserProfile, authStateChange, authSignOut } = authSlice.actions;

const authSignUpUser =
  ({ email, password, userName }) =>
  async (dispatch, getState) => {
    await createUserWithEmailAndPassword(auth, email, password).catch(
      (error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(`${errorCode},${errorMessage}`);
      }
    );
    await updateProfile(auth.currentUser, {
      displayName: `${userName}`,
    });
    console.log(auth.currentUser);
    const { uid, displayName } = auth.currentUser;
    dispatch(updateUserProfile({ userId: uid, userName: displayName }));
  };

const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const { uid, displayName } = auth.currentUser;
        dispatch(updateUserProfile({ userId: uid, userName: displayName }));
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(`${errorCode},${errorMessage}`);
      });
  };

const authSignOutUser = () => async (dispatch, getState) => {
  signOut(auth).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(`${errorCode},${errorMessage}`);
  });
  dispatch(authSignOut());
  console.log(getState());
};

const authStateChangeUser = () => async (dispatch, getState) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const { uid, displayName } = auth.currentUser;

      dispatch(authStateChange({ stateChange: true }));
      dispatch(updateUserProfile({ userId: uid, userName: displayName }));
    }
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(`${errorCode},${errorMessage}`);
  });
};

export { authSignInUser, authSignOutUser, authSignUpUser, authStateChangeUser };
