import { useEffect } from 'react';
import NavBarCollection from "../components/NavBarCollection"
import ImageCollectionList from '../components/ImageCollectionList';
import "../css/collectionPage.css"
import "../css/ImageCollection.css"
import { useUser } from '../UserHooking'; 
import imagen from "../assets/img2.jpg";
import { useNavigate } from "react-router-dom";

export default function CollectionPage() {
  
  // Agregamos las imágenes de la base de datos
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

  // Muestra la página collection
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div>
      <p>Nombre de usuario: {user ? user.userName : 'No hay usuario logueado'} Correo: {user ? user.userEmail : 'No hay usuario logueado'}</p>
      <NavBarCollection />
      <ImageCollectionList imageList={imageList} />
    </div>
  );
}
