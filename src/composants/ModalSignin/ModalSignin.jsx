import { useContext, useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/userContext";

export default function SignInModal() {
  const { modalState, toggleModals, signIn } = useContext(UserContext);
  const navigate = useNavigate();
  const [validation, setValidation] = useState("");
  const inputs = useRef([]);
  const addInputs = (el) => {
    if (el && !inputs.current.includes(el)) {
      inputs.current.push(el);
    }
  };
  const formRef = useRef();

  const handleForm = async (e) => {
    e.preventDefault();

    try {
      const cred = await signIn(
        inputs.current[0].value,
        inputs.current[1].value
      );
      // à tester
      // formRef.current.reset();
      setValidation("");
      // console.log(cred);
      toggleModals("close");
      navigate("/photosave/private/private-home");
    } catch {
      setValidation("Wopsy, email and/or password incorrect");
    }
  };

  const closeModal = () => {
    setValidation("");
    toggleModals("close");
  };

  return (
    <>
      {modalState.signInModal && (
        <div className="modal-backdrop">
          <div onClick={closeModal} className="backdrop"></div>
          <div className="modal-box">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Sign Up</h5>
                  <button onClick={closeModal} className="button-close">
                    {" "}
                    <IoMdClose />
                  </button>
                </div>

                <div className="modal-body">
                  <form
                    ref={formRef}
                    onSubmit={handleForm}
                    className="sign-up-form"
                  >
                    <div className="form-group">
                      <label htmlFor="signInEmail" className="form-label">
                        Email adress
                      </label>
                      <input
                        ref={addInputs}
                        name="email"
                        required
                        type="email"
                        className="form-control"
                        id="signInEmail"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="signInPwd" className="form-label">
                        Password
                      </label>
                      <input
                        ref={addInputs}
                        name="pwd"
                        required
                        type="password"
                        className="form-control"
                        id="signInPwd"
                      />
                      <p className="validation-error">{validation}</p>
                    </div>

                    <button className="button-submit">Submit</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
