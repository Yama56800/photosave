import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useContext, useState } from "react";
import { UserContext } from "../../Context/userContext";
import { storage } from "../../firebase-config";
import { auth } from "../../firebase-config";
const UploadModal = () => {
  const {
    uploadModalShow,
    toggleUploadModal,
    addUploadedImage,
    refreshUserImages,
    addUploadedImageInfo,
    // Assure-toi d'importer refreshUserImages correctement depuis le contexte
  } = useContext(UserContext);
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const handleChangeFile = (e) => {
    setFile(e.target.files[0]);
  };

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangeCategory = (e) => {
    setCategory(e.target.value);
  };
  const handleUpload = async () => {
    if (file) {
      const uploadDate = new Date();
      const filePath = `users/${auth.currentUser.uid}/${file.name}`;
      const fileRef = ref(storage, filePath);

      try {
        await uploadBytes(fileRef, file);
        const url = await getDownloadURL(fileRef);

        addUploadedImageInfo({ url, name: file.name });
        // Au lieu d'ajouter juste l'URL, ajoute un objet contenant à la fois l'URL et le nom du fichier
        const imageInfo = {
          url,
          name: file.name, // Nom du fichier
          category, // Catégorie si tu souhaites également la conserver
          uploadDate: uploadDate.toISOString(), // Date d'upload
        };

        addUploadedImage(imageInfo); // Ajuste cette fonction pour gérer un objet
        refreshUserImages();
        toggleUploadModal();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className={`modal ${uploadModalShow ? "is-active" : ""}`}>
      <div className="modal-background" onClick={toggleUploadModal}></div>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h5 className="upload-modal-title">Upload Image</h5>
        <button onClick={toggleUploadModal}>Close</button>
        Close
        <div className="upload-modal-body">
          <input
            type="text"
            value={name}
            onChange={handleChangeName}
            placeholder="Nom de la photo"
            className="form-control"
          />
          <select
            value={category}
            onChange={handleChangeCategory}
            className="form-control"
          >
            <option value="">Choisir une catégorie</option>
            <option value="animaux">Animaux</option>
            <option value="paysages">Paysages</option>
            <option value="portraits">Portraits</option>
          </select>
          <input
            type="file"
            onChange={handleChangeFile}
            className="form-control"
          />
          <button onClick={handleUpload} className="button-submit">
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadModal;
