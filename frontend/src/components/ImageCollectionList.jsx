// ImageCollectionList.jsx
import ImageCollection from '../components/ImageCollection';
import '../css/ImageCollectionList.css';

const ImageCollectionList = ({ imageList }) => {
  return (
    <div className="image-collection-list">
      {imageList.map((image, index) => (
        <div key={index} className="image-collection">
          <ImageCollection
            imageUrl={image.imageUrl}
            imageName={image.imageName}
          />
        </div>
      ))}
    </div>
  );
};

export default ImageCollectionList;
