import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";

export default function PrivateHome() {
  const [userEmail, setUserEmail] = useState("");
  const [userImages, setUserImages] = useState([]);
  const auth = getAuth();
  const storage = getStorage();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserEmail(user.email);

        // Récupérer les images de l'utilisateur
        const userRef = ref(storage, `users/${user.uid}`);
        const res = await listAll(userRef);
        const imageUrls = await Promise.all(
          res.items.map((item) => getDownloadURL(item))
        );
        setUserImages(imageUrls);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  return (
    <div className="container p-5">
      <h3>hello ! {userEmail}</h3>

      <h1 className="display-3 text-light mb-4">Home Sweet Private Home</h1>

      {/* Afficher les images de l'utilisateur */}
      {userImages.map((url, index) => (
        <img key={index} src={url} alt="User upload" />
      ))}
    </div>
  );
}
