import React from 'react';
import {URL} from "../App";
import { flowers } from '../constants';
function findFlowerData(nombre) {
  return flowers.find((flower) => flower.id === nombre);
}

function MostrarObjetoInfo(datosObjeto) {
  // Extraemos los datos del objeto 'datosObjeto'
  const { nombre, imagenURL, Lugar, Tiempo, Clima } = datosObjeto;
  const flowerData = findFlowerData(nombre);
  // El componente devuelve un contenedor con información del objeto
  return (
    <div className="contenedor-informacion-objeto">
      <h2>{flowerData.nombreCientifico}</h2>
      <img src={`${URL}${imagenURL}`} alt={nombre} className="imagen-objeto" />
      <div className="descripcion-objeto">
        <p>Familia: {flowerData.familia}</p>
        <p>Origen: {flowerData.origen}</p>
        <p>Floración: {flowerData.floracion}</p>
        <p>Riesgo: {flowerData.riesgo}</p>
        <p>Condiciones para Vivir: {flowerData.condiciones}</p>
        <p>{Lugar}</p>
        <p>{Tiempo}</p>
        <p>{Clima}</p>
      </div>
      
    </div>
  );
}


export default MostrarObjetoInfo;
