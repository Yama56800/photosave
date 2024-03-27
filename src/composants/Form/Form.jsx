import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const schema = yup
    .object({
      name: yup
        .string()
        .max(50)
        .required("Merci de rentrer votre nom et prénom"),
      email: yup
        .string()
        .email("Merci de renter une adresse mail valide")
        .max(255)
        .required("Merci de rentrer une adresse mail"),
      phone: yup
        .number()
        .typeError("Merci de rentrer un numéro de téléphone valide")
        .required("Merci de rentrer un numéro de téléphone"),
      message: yup.string().required("Merci de rentrer un message"),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const onSubmit = (data) => {
    const templateId = "template_5yb1elr";
    const serviceId = "service_5ekk2xg";
    const userId = "1pE5dkAnWFR8sGczr";

    emailjs
      .send(serviceId, templateId, data, userId)
      .then((response) => {
        console.log(
          "Message sent successfully",
          response.status,
          response.text
        );
        setIsSubmitted(true);
        reset();
      })
      .catch((err) => console.error("Failed to send the message, error:", err));
  };

  return (
    <div className="form" id="contact">
      <div className="contact-form">
        <h2>DÉMARRONS UN PROJET ENSEMBLE, N'HÉSITEZ PAS À ME CONTACTER</h2>
        {!isSubmitted ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label htmlFor="name">Nom et Prenom</label>
              <input
                className={`input-contact ${errors.name ? "is-invalid" : ""}`}
                type="text"
                id="name"
                name="name"
                placeholder="Nom et Prenom"
                {...register("name")}
                aria-invalid={errors.name ? "true" : "false"}
                aria-describedby="nameError"
              />
              {errors.name && <p id="nameError">{errors.name.message}</p>}

              <label htmlFor="email">Email</label>
              <input
                className={`input-contact ${errors.email ? "is-invalid" : ""}`}
                type="email"
                id="email"
                name="email"
                placeholder="exemple@gmail.com"
                {...register("email")}
                aria-invalid={errors.email ? "true" : "false"}
                aria-describedby="emailError"
              />
              {errors.email && <p id="emailError">{errors.email.message}</p>}

              <label htmlFor="phone">Telephone</label>
              <input
                className={`input-contact ${errors.phone ? "is-invalid" : ""}`}
                type="text"
                id="phone"
                name="phone"
                placeholder="+12345678"
                {...register("phone")}
                aria-invalid={errors.phone ? "true" : "false"}
                aria-describedby="phoneError"
              />
              {errors.phone && <p id="phoneError">{errors.phone.message}</p>}

              <label htmlFor="Sujet">Sujet</label>
              <select
                className="select-contact"
                name="subject"
                id="Sujet"
                {...register("subject")}
              >
                <option value="devis">Devis</option>
                <option value="questions">Questions</option>
                <option value="Autre">Autre</option>
              </select>

              <label htmlFor="message">Message</label>
              <textarea
                className={`message-contact ${
                  errors.message ? "is-invalid" : ""
                }`}
                placeholder="Merci de renseigner vos questions ou commentaires"
                id="message"
                name="message"
                {...register("message")}
                aria-invalid={errors.message ? "true" : "false"}
                aria-describedby="messageError"
              ></textarea>
              {errors.message && (
                <p id="messageError">{errors.message.message}</p>
              )}

              <button type="submit">ME CONTACTER</button>
            </div>
          </form>
        ) : (
          <div className="form-submitted-message">
            Votre message a été envoyé. Merci de nous avoir contacté !
          </div>
        )}
      </div>
    </div>
  );
};

export default Contact;
