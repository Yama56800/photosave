import { deleteObject, ref } from "firebase/storage";
import { useContext, useEffect } from "react";
import { UserContext } from "../../Context/userContext";
import { auth, storage } from "../../firebase-config"; // Assure-toi que c'est le bon chemin d'import
import { RiDeleteBin2Fill } from "react-icons/ri";
const DeleteImageButton = ({ imageName }) => {
  const { refreshFlag, refreshUserImages } = useContext(UserContext);

  useEffect(() => {
    // Logique pour charger les images
  }, [refreshFlag]);
  const handleDelete = async () => {
    // Assure-toi d'avoir le bon chemin. Si tu stockes le chemin complet lors de l'upload, utilise-le ici directement.
    const fileRef = ref(storage, `users/${auth.currentUser.uid}/${imageName}`);

    try {
      await deleteObject(fileRef);

      refreshUserImages(); // Appelle cette fonction pour mettre à jour l'affichage des images
    } catch (error) {
      console.error("Erreur lors de la suppression de l'image:", error);
      alert("Erreur lors de la suppression de l'image");
    }
  };

  return (
    <button className="delete-btn" onClick={handleDelete}>
      <RiDeleteBin2Fill className="delete-icon" />
    </button>
  );
};
export default DeleteImageButton;
