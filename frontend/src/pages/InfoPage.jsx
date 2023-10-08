import React, { useState } from 'react';
import MostrarObjetoInfo from '../components/MostrarObjetoInfo';
import '../css/InfoPageEstilo.css'; // Importa tus estilos CSS


function InfoPage() {
  // Estado para almacenar información del objeto
  const [infoObjeto, setInfoObjeto] = useState({
    nombre: 'Nombre del Objeto',
    imagenURL: 'URL de la Imagen',
    descripcion: 'Descripción del objeto detectado.',
  });

  // Detectamos y actualizamos infoObjeto

  return (
    <div className="pagina-info">
      <h1>Detector de Objetos</h1>
      <MostrarObjetoInfo
        nombre={infoObjeto.nombre}
        imagenURL={infoObjeto.imagenURL}
        descripcion={infoObjeto.descripcion}
      />
    </div>
  );
}

export default InfoPage;
