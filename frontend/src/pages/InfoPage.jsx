import React, { useState } from 'react';
import MostrarObjetoInfo from '../components/MostrarObjetoInfo';
import '../css/InfoPageEstilo.css'; // Importa tus estilos CSS
import { useUser } from '../UserContext';


function InfoPage() {
  // Estado para almacenar información del objeto
  const [infoObjeto, setInfoObjeto] = useState({
    nombre: 'CANTUTA',
    imagenURL: 'https://caminoincamachupicchu.org/cmingutd/wp-content/uploads/2023/06/cantu-camino-.jpg',
    descripcion: 'Cantua buxifolia, conocida popularmente como cantuta, es una especie de arbusto perteneciente a la familia Polemoniaceae.​ Es la flor nacional del Perú y una de las dos flores nacionales de Bolivia, ​​​ y fue considerada «la flor sagrada de los incas».​',
  });

  // Detectamos y actualizamos infoObjeto
  const { user } = useUser();
  if (!user) {
    return <div>No hay usuario logueado.</div>;
  }
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="pagina-info justify-center">
        <p>Nombre de usuario: {user.userName} Correo: {user.userEmail}</p>
        <h1>Detector de Objetos</h1>
        <MostrarObjetoInfo
          nombre={infoObjeto.nombre}
          imagenURL={infoObjeto.imagenURL}
          descripcion={infoObjeto.descripcion}
        />
      </div>
    </div>
  );
}

export default InfoPage;
