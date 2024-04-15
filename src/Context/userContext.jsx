import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase-config";

export const UserContext = createContext();

export function UserContextProvider({ children }) {
  console.log("test");
  const signUp = (email, pwd) =>
    createUserWithEmailAndPassword(auth, email, pwd);
  const signIn = (email, pwd) => signInWithEmailAndPassword(auth, email, pwd);

  const [currentUser, setCurrentUser] = useState(null);
  const [loadingData, setLoadingData] = useState(true);
  console.log("MAJ", currentUser);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setCurrentUser(currentUser);
      setLoadingData(false);
    });

    return unsubscribe;
  }, []);
  // Dans UserContextProvider
  const [refreshFlag, setRefreshFlag] = useState(false);

  const refreshUserImages = () => {
    setRefreshFlag((prevFlag) => !prevFlag); // Bascule la valeur pour déclencher une mise à jour
  };

  // modal
  const [modalState, setModalState] = useState({
    signUpModal: false,
    signInModal: false,
  });
  const [uploadedImages, setUploadedImages] = useState([]);

  const toggleModals = (modal) => {
    if (modal === "signIn") {
      setModalState({
        signUpModal: false,
        signInModal: true,
      });
    }
    if (modal === "signUp") {
      setModalState({
        signUpModal: true,
        signInModal: false,
      });
    }
    if (modal === "close") {
      setModalState({
        signUpModal: false,
        signInModal: false,
      });
    }
  };
  const navigate = useNavigate();
  const logOut = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
      navigate("/photosave/");
      console.log("ici"); // Naviguer vers la page d'accueil
    } catch (error) {
      console.error(error);
    }
  };
  const [uploadModalShow, setUploadModalShow] = useState(false);
  const toggleUploadModal = () => {
    setUploadModalShow(!uploadModalShow);
  };
  const addUploadedImage = (imageUrl) => {
    setUploadedImages((prevImages) => [...prevImages, imageUrl]);
  };
  const [uploadedImagesInfo, setUploadedImagesInfo] = useState([]);
  const addUploadedImageInfo = (imageInfo) => {
    setUploadedImagesInfo((prev) => [...prev, imageInfo]);
  };
  const removeUploadedImageInfo = (imageName) => {
    setUploadedImagesInfo((prev) =>
      prev.filter((imageInfo) => imageInfo.name !== imageName)
    );
  };

  const addExistingImagesInfo = (imagesInfo) => {
    setUploadedImagesInfo(imagesInfo);
  };
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);
  const openImageModal = (imageUrl) => {
    console.log("Ouverture de la modal avec l'image URL :", imageUrl);
    setSelectedImageUrl(imageUrl);
    setIsImageModalOpen(true);
  };

  const closeImageModal = () => {
    setIsImageModalOpen(false);
    setSelectedImageUrl(null); // Optionnel, pour nettoyer l'URL de l'image précédente
  };

  return (
    <UserContext.Provider
      value={{
        modalState,
        toggleModals,
        signIn,
        signUp,
        currentUser,
        setCurrentUser, // Ajoutez ceci
        uploadModalShow, // Nouvel état pour l'affichage de la modal
        toggleUploadModal,
        uploadedImages, // L'état contenant les URLs des images
        addUploadedImage,
        refreshFlag, // Ajoute ceci
        refreshUserImages,
        uploadedImagesInfo,
        addExistingImagesInfo,
        addUploadedImageInfo,
        removeUploadedImageInfo,
        isImageModalOpen,
        selectedImageUrl,
        openImageModal,
        closeImageModal, // La fonction pour ajouter une nouvelle URL d'image
        logOut, // Fonction pour contrôler l'affichage
      }}
    >
      {!loadingData && children}
    </UserContext.Provider>
  );
}
UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
