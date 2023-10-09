import { useState, useEffect } from 'react';
import MostrarObjetoInfo from '../components/MostrarObjetoInfo';
import '../css/InfoPageEstilo.css'; // Importa tus estilos CSS
import { useUser } from '../UserHooking';
import { useLocation, useNavigate } from 'react-router-dom';
import {URL} from "../App";

function InfoPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const imageUrl = queryParams.get('imageUrl');
  const imageName = queryParams.get('imageName');
  const [infoObjeto, setInfoObjeto] = useState(null);

  // Detectamos y actualizamos infoObjeto
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/');
    } else {
      const apiUrl = `${URL}/api/getImageData?imageUrl=${imageUrl}&imageName=${imageName}`
      // Realizar solicitud al servidor para obtener información de la imagen
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          setInfoObjeto(data);
        })
        .catch((error) => {
          console.error('Error al obtener datos de la imagen:', error);
        });
    }
  }, [user, navigate, imageUrl, imageName]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="pagina-info justify-center">
        {infoObjeto ? (
          <>
            {/*<p>
              Nombre de usuario: {user ? user.userName : 'No hay usuario logueado'} Correo: {user ? user.userEmail : 'No hay usuario logueado'} uwu: {imageUrl} predict: {imageName}
            </p>*/}
            <MostrarObjetoInfo
              nombre={infoObjeto.predict}
              imagenURL={infoObjeto.image}
              Lugar={`Arequipa`}
              Tiempo={infoObjeto.fecha}
              Clima={infoObjeto.clima}
            />
          </>
        ) : (
          <p>Cargando información...</p>
        )}
      </div>
    </div>
  );
}

export default InfoPage;

