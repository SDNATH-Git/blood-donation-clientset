import React, { createContext, useEffect, useState } from "react";
import app from "../Firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  updateProfile, // ✅ user profile update function
} from "firebase/auth";

// Create the Auth Context
export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Email/Password Sign Up with Name & Photo
  const createUser = async (email, password, name, photoURL) => {
    setLoading(true);
    const result = await createUserWithEmailAndPassword(auth, email, password);

    // ✅ Update Firebase Profile
    await updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoURL,
    });

    // Manually set updated user for instant access
    setUser({
      ...result.user,
      displayName: name,
      photoURL: photoURL,
    });

    return result;
  };

  // ✅ Email/Password Sign In
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // ✅ Google Sign In
  const googleProvider = new GoogleAuthProvider();
  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // ✅ Logout
  const logout = () => {
    setLoading(true);
    return signOut(auth);
  };

  // ✅ Password Reset
  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  // ✅ Auth State Listener-----
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // ✅ Provide Context-----
  const authData = {
    user,
    setUser,
    createUser,
    signIn,
    logout,
    googleSignIn,
    loading,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={authData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;