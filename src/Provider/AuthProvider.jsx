// import React, { createContext, useEffect, useState } from "react";
// import app from "../Firebase/firebase.config";
// import {
//   createUserWithEmailAndPassword,
//   getAuth,
//   onAuthStateChanged,
//   signInWithEmailAndPassword,
//   signOut,
//   GoogleAuthProvider,
//   signInWithPopup,
//   sendPasswordResetEmail,
//   updateProfile,
// } from "firebase/auth";
// import axios from "axios"; // ✅ added for API call

// export const AuthContext = createContext();
// const auth = getAuth(app);

// const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // ✅ Sign Up
//   const createUser = async (email, password, name, photoURL) => {
//     setLoading(true);
//     const result = await createUserWithEmailAndPassword(auth, email, password);
//     await updateProfile(auth.currentUser, {
//       displayName: name,
//       photoURL: photoURL,
//     });

//     setUser({
//       ...result.user,
//       displayName: name,
//       photoURL: photoURL,
//     });

//     return result;
//   };

//   // ✅ Sign In
//   const signIn = (email, password) => {
//     setLoading(true);
//     return signInWithEmailAndPassword(auth, email, password);
//   };

//   // ✅ Google Sign In
//   const googleProvider = new GoogleAuthProvider();
//   const googleSignIn = () => {
//     setLoading(true);
//     return signInWithPopup(auth, googleProvider);
//   };

//   // ✅ Logout
//   const logout = () => {
//     setLoading(true);
//     return signOut(auth);
//   };

//   // ✅ Reset Password
//   const resetPassword = (email) => {
//     return sendPasswordResetEmail(auth, email);
//   };

//   // ✅ Auth state change handler → MongoDB user merge
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
//       if (currentUser?.email) {
//         try {
//           const res = await axios.get(`https://blood-donation-serverset.vercel.app/users/${currentUser.email}`);
//           const dbUser = res.data;

//           // ✅ Merge Firebase + DB user info
//           setUser({
//             ...currentUser,
//             name: dbUser.name,
//             role: dbUser.role,
//             status: dbUser.status,
//             blood: dbUser.blood,
//             district: dbUser.district,
//             upazila: dbUser.upazila,
//             avatar: dbUser.avatar || currentUser.photoURL,
//           });
//         } catch (err) {
//           console.error("❌ Failed to load user from DB:", err);
//           setUser(currentUser); // fallback
//         }
//       } else {
//         setUser(null);
//       }
//       setLoading(false);
//     });

//     return () => unsubscribe();
//   }, []);

//   const authData = {
//     user,
//     setUser,
//     createUser,
//     signIn,
//     logout,
//     googleSignIn,
//     loading,
//     resetPassword,
//   };

//   return (
//     <AuthContext.Provider value={authData}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthProvider;

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
  updateProfile,
} from "firebase/auth";
import axios from "axios";

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sign Up with email/password + update profile
  const createUser = async (email, password, name, photoURL) => {
    setLoading(true);
    const result = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoURL,
    });

    setUser({
      ...result.user,
      displayName: name,
      photoURL: photoURL,
    });

    setLoading(false);
    return result;
  };

  // Sign In
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Google Sign In
  const googleProvider = new GoogleAuthProvider();
  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // Logout
  const logout = () => {
    setLoading(true);
    return signOut(auth);
  };

  // Reset Password
  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  // Listen to Firebase Auth state changes and fetch DB user data
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser?.email) {
        try {
          const res = await axios.get(`https://blood-donation-serverset.vercel.app/users/${currentUser.email}`);
          const dbUser = res.data;

          setUser({
            uid: currentUser.uid,
            email: currentUser.email,
            displayName: dbUser.name || currentUser.displayName,
            role: dbUser.role || "donor", // default role if missing
            status: dbUser.status || "active",
            blood: dbUser.blood || "",
            district: dbUser.district || "",
            upazila: dbUser.upazila || "",
            photoURL: dbUser.avatar || currentUser.photoURL || "",
          });
        } catch (error) {
          console.error("Failed to fetch user from DB:", error);
          // fallback to firebase user
          setUser(currentUser);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

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

  return <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
