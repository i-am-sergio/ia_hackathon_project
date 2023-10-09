// ImageCollectionList.jsx
import ImageCollection from '../components/ImageCollection';
import '../css/ImageCollectionList.css';

const ImageCollectionList = ({ imageList }) => {
  return (
    <div className="image-collection-list">
      {imageList.map((image, index) => (
        <div key={index} className="image-collection">
          <ImageCollection
            imageUrl={image.image}
            imageName={image.predict}
          />
        </div>
      ))}
    </div>
  );
};

export default ImageCollectionList;
