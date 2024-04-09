import { getAuth } from "firebase/auth";
import {
  getDownloadURL,
  getMetadata,
  getStorage,
  listAll,
  ref,
} from "firebase/storage";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Context/userContext";
import DeleteImageButton from "../../composants/DeleteBtn/DeleteBtn";

export default function PrivateHome() {
  const [userEmail, setUserEmail] = useState("");
  const { uploadedImagesInfo, refreshFlag, addExistingImagesInfo } =
    useContext(UserContext);
  const auth = getAuth();
  const storage = getStorage();

  useEffect(() => {
    const fetchUserEmail = () => {
      const user = auth.currentUser;
      if (user) {
        setUserEmail(user.email);
      }
    };

    const fetchImages = async () => {
      const user = auth.currentUser;
      if (user) {
        const userRef = ref(storage, `users/${user.uid}`);
        const snapshot = await listAll(userRef);

        const imagesInfo = await Promise.all(
          snapshot.items.map(async (item) => {
            const url = await getDownloadURL(item);
            const metadata = await getMetadata(item);
            return {
              url,
              name: metadata.name,
              timeCreated: metadata.timeCreated,
            };
          })
        );

        // Tri des images par date de création
        const sortedImagesInfo = imagesInfo.sort(
          (a, b) => new Date(b.timeCreated) - new Date(a.timeCreated)
        );
        addExistingImagesInfo(sortedImagesInfo);
      }
    };

    fetchUserEmail();
    fetchImages();
  }, [auth, storage, refreshFlag]);

  return (
    <div className="gallery-container">
      <h3>Hello ! {userEmail}</h3>
      <h1 className="display-3 text-light mb-4">Your Gallery !</h1>
      <div className="gallery-content">
        {uploadedImagesInfo.map((imageInfo, index) => (
          <div className="img-container" key={index}>
            <img
              className="img-user"
              src={imageInfo.url}
              alt={`Upload ${index}`}
            />
            <DeleteImageButton imageName={imageInfo.name} />
          </div>
        ))}
      </div>
    </div>
  );
}
