import { useRef, useState, useEffect } from 'react';
import { useUser } from '../UserHooking';
import { useNavigate } from "react-router-dom";
import {URL} from "../App";
import EXIF from 'exif-js';
const CameraCapture = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [photoData, setPhotoData] = useState(null);
  const [isRearCamera, setIsRearCamera] = useState(false);
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  const getLocation = () => {
  return new Promise((resolve, reject) => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        // Utiliza las coordenadas (latitude y longitude) para obtener la ciudad desde un servicio de geocodificación inversa
        const apiKey = 'de0eb6890a9d4a079feefc9fa227c2be'; // Reemplaza con tu clave de API de geocodificación inversa
        const geoUrl = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`;

        try {
          const response = await fetch(geoUrl);
          const data = await response.json();
          const city = data.results[0].components.city;
          resolve(city);
        } catch (error) {
          console.error('Error al obtener la ciudad:', error);
          reject(error);
        }
      });
    } else {
      console.error('La geolocalización no está disponible en este navegador.');
      reject('Geolocalización no disponible');
    }
  });
};

  const getPhotoTime = async (dataURL) => {
    const image = new Image();
    image.src = dataURL;
    image.onload = () => {
      EXIF.getData(image, function () {
        const datetime = EXIF.getTag(this, 'DateTimeOriginal');
        if (datetime) {
          const date = new Date(datetime);
          const hour = date.getHours();
          const minute = date.getMinutes();
          resolve({ hour, minute }); 
        }
      });
    };
  };

  const handleCapture = async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
  
    if (video) {
      const context = canvas.getContext('2d');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      const dataURL = canvas.toDataURL('image/jpg');
      setPhotoData(dataURL);
  
      // Convertir la imagen capturada a Blob
      const blob = await fetch(dataURL).then((res) => res.blob());
  
      // Obtener el username y email de donde sea necesario en tu componente
      const username = user.userName;
      const email = user.userEmail;
  
      // Esperar a que getLocation y getPhotoTime se resuelvan antes de continuar
      const location = await getLocation();
      const phototime = await getPhotoTime(dataURL);
  
      // Enviar la imagen al servidor junto con username, email, location y phototime
      sendImageToServer(blob, username, email, location, phototime);
    }
  };
  

  const sendImageToServer = async (imageBlob, username, email, location, phototime) => {
    // Crear un objeto FormData y agregar la imagen, username y email al cuerpo de la solicitud
    const formData = new FormData();
    formData.append('photo', imageBlob, 'captured_photo.png');
    formData.append('username', username);
    formData.append('email', email);
    formData.append('location', location); // Agregar la ubicación
    formData.append('phototime', phototime);
    try {
      // Enviar la solicitud POST al servidor
      const response = await fetch(`${URL}/upload`, {
        method: 'POST',
        body: formData,
      });
  
      // Verificar si la respuesta HTTP tiene éxito (código de estado 200)
      if (response.ok) {
        // Obtener los datos de la respuesta como objeto JSON
        const responseData = await response.json();
  
        // Acceder a la propiedad 'laprediccion' y mostrar su valor
        const laprediccion = responseData.laprediccion;
        console.log('Predicción del servidor:', laprediccion);
        alert('Predicción del servidor:' + laprediccion);
      } else {
        console.error('Error en la respuesta del servidor:', response.status, response.statusText);
        alert('Error en la respuesta del servidor:' + response.status + ' ' + response.statusText);
      }
    } catch (error) {
      console.error('Error al enviar la imagen al servidor:', error);
      alert('Error al enviar la imagen al servidor:' + error.message);
    }
  };
  

  const initializeCamera = async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter(device => device.kind === 'videoinput');
      // Verificar si hay al menos dos cámaras (frontal y posterior)
      if (videoDevices.length >= 2) {
        setIsRearCamera(true);
      } else {
        setIsRearCamera(false);
      }

      // const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: isRearCamera ? 'environment' : 'user',
        },
      });

      const video = videoRef.current;
      video.srcObject = stream;
      await video.play();
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Error accessing camera:'+ error);
    }
  };

  const handleStopCapture = () => {
    const video = videoRef.current;
    const stream = video.srcObject;
    const tracks = stream.getTracks();
    tracks.forEach(track => track.stop());
    video.srcObject = null;
    setPhotoData(null);
  };

  const toggleCamera = () => {
    setIsRearCamera(prevIsRearCamera => !prevIsRearCamera);
    handleStopCapture();
    initializeCamera();
  };

  useEffect(() => {
    initializeCamera();
  }, []); // ComponentDidMount
  
  return (
    <div>
      {/*<p>Nombre de usuario: {user ? user.userName : 'No hay usuario logueado'} Correo: {user ? user.userEmail : 'No hay usuario logueado'}</p>*/}
      <video ref={videoRef} style={{ display: 'block', margin: '10px 0'}}></video>
      <button className='bg-slate-400 mx-5' onClick={initializeCamera}>Start Camera</button>
      <button className='bg-blue-300 mx-5' onClick={handleCapture}>Capture Photo</button>
      <button className='bg-red-400 mx-5' onClick={handleStopCapture}>Stop Camera</button>

      {isRearCamera && (
        <button className='bg-green-400 mx-5' onClick={toggleCamera}>
          Toggle Camera (Front/Rear)
        </button>
      )}

      {photoData && (
        <div>
          <p>Preview:</p>
          <img src={photoData} alt="Captured" style={{ maxWidth: '100%', maxHeight: '200px' }} />
        </div>
      )}

      {/* Hidden canvas element for drawing captured photo */}
      <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
    </div>
  );
};

export default CameraCapture;
