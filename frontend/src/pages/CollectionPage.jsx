///*
import NavBarCollection from "../components/NavBarCollection"
import ImageCollectionList from '../components/ImageCollectionList';
import "../css/collectionPage.css"
import "../css/ImageCollection.css"
import { useUser } from '../UserContext';
import imagen from "../assets/img2.jpg";

export default function CollectionPage() {
  
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
  const { user } = useUser();
  if (!user) {
    return <div>No hay usuario logueado.</div>;
  }
  return (
    <div>
      <p>Nombre de usuario: {user.userName} Correo: {user.userEmail}</p>
      <NavBarCollection />
      <ImageCollectionList imageList={imageList} />
    </div>
  );
}
