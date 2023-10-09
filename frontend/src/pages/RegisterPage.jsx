import styles from "../scss/register.module.scss";
import { MdEmail } from "react-icons/md";
import { BiSolidUser } from "react-icons/bi";
import { BsKeyFill, BsGenderAmbiguous } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { useState, useEffect, useCallback } from "react";
import { logo, applogo } from "../assets";
import { Link, useNavigate } from "react-router-dom";
import {URL} from "../App";

function RegisterPage() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    gender: "Masculino",
  });
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === "checkbox" ? checked : value;
    if (name === "email") {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const emailIsValid = emailPattern.test(newValue);
      if (!emailIsValid) {
        setError("Ingrese un correo válido.");
        setShowError(true);
      } else {
        setError("");
        setShowError(false);
      }
    } 
    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const isFormValid = useCallback(() => {
    const { username, email, password, firstName, lastName } = formData;

    return (
      username !== "" &&
      email !== "" &&
      password !== "" &&
      firstName !== "" &&
      lastName !== ""
    );
  }, [formData]);

  useEffect(() => {
    setIsButtonDisabled(!isFormValid());
  }, [formData, isFormValid]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isFormValid()) {
      setError("Rellena todos los campos.");
      setShowError(true);
      return;
    }
    try {
      const response = await fetch(`${URL}/check_email`, {
        method: 'POST',
        body: JSON.stringify({ email: formData.email }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.status === 409) {
        setError("El correo ya tiene una cuenta existente.");
        setShowError(true);
        return;
      }

      const registrationResponse = await fetch(`${URL}/register`, {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (registrationResponse.status === 201) {
        console.log('Usuario registrado con éxito:', registrationResponse);
        navigate('/');
      } else {
        setError("Error en el servidor al registrar el usuario.");
        setShowError(true);
      }

    } catch (error) {
      console.error('Error al enviar datos de registro al servidor:', error);
      setError("Error en el servidor.");
      setShowError(true);
    }
  };
  

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img src={applogo} className={styles.appLogo} />
        <div className={styles.text}>Registrarse</div>
        <div className={styles.underline}></div>
      </div>
      <div className={styles.inputs}>
        <div className={styles.input}>
          <BiSolidUser className={styles.img} />
          <input
            type="text"
            className={styles.entry}
            placeholder="Nombre de usuario"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.input}>
          <MdEmail className={styles.img} />
          <input
            type="email"
            className={styles.entry}
            placeholder="Correo electrónico"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.input}>
          <BsKeyFill className={styles.img} />
          <input
            type="password"
            className={styles.entry}
            placeholder="Contraseña"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.input}>
          <FaUserCircle className={styles.img} />
          <input
            type="text"
            className={styles.entry}
            placeholder="Nombre"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.input}>
          <FaUserCircle className={styles.img} />
          <input
            type="text"
            className={styles.entry}
            placeholder="Apellido"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.input}>
          <BsGenderAmbiguous className={styles.img} />
          <select
            name="gender"
            className={styles.entry}
            value={formData.gender}
            onChange={handleInputChange}
          >
            <option value="male">Masculino</option>
            <option value="female">Femenino</option>
            <option value="other">Otro</option>
          </select>
        </div>
      </div>
      <div className={styles.forgot_password}>
        {showError && <span>{error}</span>}
      </div>
      <div className={styles.submit_container}>
        <div
          className={`${styles.submit} ${
            isButtonDisabled || showError ? styles.gray : ""
          }`}
          onClick={handleSubmit}
          disabled={isButtonDisabled || showError}
        >
          Registrarse
        </div>
        <Link to="/" className={`${styles.submit}`}>
          Iniciar Sesión
        </Link>
      </div>
      <div className={styles.powered}>
        <div className={styles.image} onClick={handleSubmit}>
          <img src={logo} className={styles.logo} />
        </div>
        <div className={styles.message}>DEVOPSX100PRE</div>
      </div>
    </div>
  );
}

export default RegisterPage;
