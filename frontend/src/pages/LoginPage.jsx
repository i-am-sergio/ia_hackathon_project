import styles from "../scss/login.module.scss";
import { MdEmail } from "react-icons/md";
import { BsKeyFill } from "react-icons/bs";
import { useState, useEffect, useCallback } from "react";
import { logo, applogo } from "../assets";

function LoginPage() { // Cambiando el nombre de la función
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
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

  const handleSubmit = (event) => {
    event.preventDefault();
    // Envío a backend para la autenticación
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
        ¿Olvidaste la contraseña? <span>Haz clic aquí</span>
      </div>
      <div className={styles.submit_container}>
        <div
          className={`${styles.submit} ${isButtonDisabled ? styles.gray : ""}`}
          onClick={handleSubmit}
          disabled={isButtonDisabled}
        >
          Iniciar Sesión
        </div>
        <div className={`${styles.submit} ${styles.gray}`}>Registrarse</div>
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
