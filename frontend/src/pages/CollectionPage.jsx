import { useEffect, useState } from 'react';
import ImageCollectionList from '../components/ImageCollectionList';
import '../css/collectionPage.css';
import { useUser } from '../UserHooking';
import { useNavigate } from 'react-router-dom';
import {URL} from "../App";

export default function CollectionPage() {
  const { user } = useUser();
  const navigate = useNavigate();

  const [imageList, setImageList] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate('/');
    } else {
      // Realiza una solicitud HTTP para obtener las imágenes
      const apiUrl = `${URL}/api/images?userName=${user.userName}&userEmail=${user.userEmail}`;
      
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          setImageList(data);
        })
        .catch((error) => {
          console.error('Error al obtener las imágenes:', error);
        });
    }
  }, [user, navigate]);

  return (
    <div>
      {/*<p>Nombre de usuario: {user ? user.userName : 'No hay usuario logueado'} Correo: {user ? user.userEmail : 'No hay usuario logueado'}</p>
      <NavBarCollection />*/}
      <ImageCollectionList imageList={imageList} />
    </div>
  );
}
