///*
import NavBarCollection from "../components/NavBarCollection"
import ImageCollectionList from '../components/ImageCollectionList';
import "../css/collectionPage.css"
import "../css/ImageCollection.css"
import imagen from "../assets/img2.jpg";

function Collection() {
  
  //Agregamos las imagenes de la base de datos
  const imageList = [
    { imageUrl: imagen, imageName: 'Imagen 1' },
    { imageUrl: imagen, imageName: 'Imagen 2' },
    { imageUrl: imagen, imageName: 'Imagen 3' },
    { imageUrl: imagen, imageName: 'Imagen 4' },
    { imageUrl: imagen, imageName: 'Imagen 5' },
    { imageUrl: imagen, imageName: 'Imagen 6' },
    { imageUrl: imagen, imageName: 'Imagen 7' },
    { imageUrl: imagen, imageName: 'Imagen 8' },
    { imageUrl: imagen, imageName: 'Imagen 9' },
    { imageUrl: imagen, imageName: 'Imagen 10' },
  ];
  //Muestra la pagina collection
  return (
    <div>
      <NavBarCollection />
      <ImageCollectionList imageList={imageList} />
    </div>
  );
}
export default Collection;
