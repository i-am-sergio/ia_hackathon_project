import React from 'react';

function MostrarObjetoInfo(datosObjeto) {
  // Extraemos los datos del objeto 'datosObjeto'
  const { nombre, imagenURL, descripcion } = datosObjeto;

  // El componente devuelve un contenedor con información del objeto
  return (
    <div className="contenedor-informacion-objeto">
      <h2>{nombre}</h2> {/* Muestra el nombre del objeto */}
      <img src={imagenURL} alt={nombre} className="imagen-objeto" /> {/* Muestra la imagen */}
      <p className="descripcion-objeto">{descripcion}</p> {/* Muestra la descripción */}
    </div>
  );
}


export default MostrarObjetoInfo;
