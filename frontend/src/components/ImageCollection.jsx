// ImageCollection.jsx
import '../css/ImageCollection.css';

const ImageCollection = ({ imageUrl, imageName }) => {
  //Funcion que mostrara los detalles - vista nelzon
  const handleVerDetalles = () => {
    console.log(`Ver detalles de ${imageName}`);
  };

  return (
    <div className="image-container">
      <img src={imageUrl} alt={imageName} className="collection-image" />
      <div className="details-container">
        <p className="image-name">{imageName}</p>
        <button onClick={handleVerDetalles} className="details-button">
          Ver Detalles
        </button>
      </div>
    </div>
  );
};

export default ImageCollection;
