import styles from "../scss/login.module.scss";
import { MdEmail } from "react-icons/md";
import { BsKeyFill } from "react-icons/bs";
import { useState, useEffect, useCallback } from "react";
import { logo, applogo } from "../assets";
import { Link } from "react-router-dom";

function LoginPage() { // Cambiando el nombre de la función
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "email") {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const emailIsValid = emailPattern.test(value);
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
      [name]: value,
    });
  };

  const isFormValid = useCallback(() => {
    const { email, password } = formData;
    return email !== "" && password !== "";
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
      // L
      setError("Correo Electrónico no encontrado o contraseña incorrecta.");
      setShowError(true);
    } catch (error) {
      console.error('Error al autenticar al usuario:', error);
      setError("Error en el servidor.");
      setShowError(true);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img src={applogo} className={styles.appLogo} />
        <div className={styles.text}>Iniciar Sesión</div>
        <div className={styles.underline}></div>
      </div>
      <div className={styles.inputs}>
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
      </div>
      <div className={styles.forgot_password}>
        {showError && <span>{error}</span>}
      </div>
      <div className={styles.submit_container}>
        <div
          className={`${styles.submit} ${isButtonDisabled ? styles.gray : ""}`}
          onClick={handleSubmit}
          disabled={isButtonDisabled}
        >
          Iniciar Sesión
        </div>
        <Link to="/register" className={`${styles.submit}`}>Registrarse</Link>
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

export default LoginPage;
