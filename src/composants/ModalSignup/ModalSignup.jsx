import { useContext, useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/userContext";

export default function SignUpModal() {
  const { modalState, toggleModals, signUp } = useContext(UserContext);
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

    if (
      (inputs.current[1].value.length || inputs.current[2].value.length) < 6
    ) {
      setValidation("6 characters min");
      return;
    } else if (inputs.current[1].value !== inputs.current[2].value) {
      setValidation("Passwords do not match");
      return;
    }

    try {
      const cred = await signUp(
        inputs.current[0].value,
        inputs.current[1].value
      );
      setValidation("");
      // console.log(cred);
      toggleModals("close");
      navigate("/private/private-home");
    } catch (err) {
      if (err.code === "auth/invalid-email") {
        setValidation("Email format invalid");
      }
      if (err.code === "auth/email-already-in-use") {
        setValidation("Email already used");
      }
    }
  };

  const closeModal = () => {
    setValidation("");
    toggleModals("close");
  };

  return (
    <>
      {modalState.signUpModal && (
        <div className="modal-backdrop">
          <div onClick={closeModal} className="backdrop"></div>
          <div className="modal-box">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Sign Up</h5>
                  <button onClick={closeModal} className="button-close">
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
                      <label htmlFor="signUpEmail" className="form-label">
                        Email adress
                      </label>
                      <input
                        ref={addInputs}
                        name="email"
                        required
                        type="email"
                        className="form-control"
                        id="signUpEmail"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="signUpPwd" className="form-label">
                        Password
                      </label>
                      <input
                        ref={addInputs}
                        name="pwd"
                        required
                        type="password"
                        className="form-control"
                        id="signUpPwd"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="repeatPwd" className="form-label">
                        Repeat Password
                      </label>
                      <input
                        ref={addInputs}
                        name="pwd"
                        required
                        type="password"
                        className="form-control"
                        id="repeatPwd"
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
