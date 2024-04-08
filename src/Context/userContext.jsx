import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase-config";
import PropTypes from "prop-types";

export const UserContext = createContext();

export function UserContextProvider({ children }) {
  const navigate = useNavigate();

  const signUp = async (email, pwd, username) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        pwd
      );
      const user = userCredential.user;

      // Stocke le nom d'utilisateur dans Firestore
      await setDoc(doc(db, "users", user.uid), {
        username: username,
        email: email,
      });

      setCurrentUser(user);
      navigate("/private/private-home"); // Redirige après l'inscription réussie
    } catch (error) {
      console.error("Erreur lors de la création de l'utilisateur :", error);
      throw error;
    }
  };

  const signIn = (email, pwd) => signInWithEmailAndPassword(auth, email, pwd);

  const [currentUser, setCurrentUser] = useState(null);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoadingData(false);
    });

    return unsubscribe;
  }, []);

  const [modalState, setModalState] = useState({
    signUpModal: false,
    signInModal: false,
  });

  const toggleModals = (modal) => {
    if (modal === "signIn") {
      setModalState({
        signUpModal: false,
        signInModal: true,
      });
    } else if (modal === "signUp") {
      setModalState({
        signUpModal: true,
        signInModal: false,
      });
    } else if (modal === "close") {
      setModalState({
        signUpModal: false,
        signInModal: false,
      });
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
      navigate("/");
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
    }
  };

  const [uploadModalShow, setUploadModalShow] = useState(false);
  const toggleUploadModal = () => {
    setUploadModalShow(!uploadModalShow);
  };

  return (
    <UserContext.Provider
      value={{
        modalState,
        toggleModals,
        signIn,
        signUp,
        currentUser,
        setCurrentUser,
        uploadModalShow,
        toggleUploadModal,
        logOut,
      }}
    >
      {!loadingData && children}
    </UserContext.Provider>
  );
}

UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
