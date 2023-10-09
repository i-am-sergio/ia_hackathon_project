import styles from '../scss/imageCollextion.module.scss';
import {URL} from "../App";
import { Link } from 'react-router-dom';

const ImageCollection = ({ imageUrl, imageName }) => {
  // Función que mostrará los detalles
  const handleVerDetalles = () => {
    console.log(`Ver detalles de ${imageName}`);
  };

  return (
    <div className={styles.image_container}>
      <img src={`${URL}${imageUrl}`} alt={imageName} className={styles.collection_image} />
      <div className={styles.details_container}>
        <div className={styles.image_name}>
          <p>{imageName}</p>
        </div>
        <Link
          to={`/info?imageUrl=${encodeURIComponent(imageUrl)}&imageName=${encodeURIComponent(imageName)}`}
          className={styles.details_button}
        >
          Ver Detalles
        </Link>
      </div>
    </div>
  );
};

export default ImageCollection;
