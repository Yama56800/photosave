import { Route, Routes } from "react-router-dom";
import Footer from "./composants/Footer/Footer";
import SignInModal from "./composants/ModalSignin/ModalSignin";
import SignUpModal from "./composants/ModalSignup/ModalSignup";
import ModalUpload from "./composants/ModalUpload/ModalUpload";
import NavBar from "./composants/NavBar/NavBar";
import Error from "./pages/Error";
import Home from "./pages/Home";
import Private from "./pages/Private/Private";
import PrivateHome from "./pages/Private/PrivateHome";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
function App() {
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user); // Met à jour l'état `currentUser` avec l'utilisateur actuellement connecté, ou `null` si l'utilisateur est déconnecté
    });

    return () => unsubscribe();
  }, []);
  return (
    <div className="App">
      <SignUpModal />
      <SignInModal />
      <ModalUpload />
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/private" element={<Private />}>
          <Route path="/private/private-home" element={<PrivateHome />} />
        </Route>
        {/* <Route path="/Sign-In" element={<Sign_in />} />
	        <Route path="/Sign-up" element={<Sign_up />} />
	        <Route path="/User" element={<User />} /> */}
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
