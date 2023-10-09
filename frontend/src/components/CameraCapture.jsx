import { useRef, useState, useEffect } from 'react';
import { useUser } from '../UserHooking';
import { useNavigate } from "react-router-dom";
import { URL } from "../App";
import EXIF from 'exif-js';
import axios from 'axios';

const CameraCapture = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [photoData, setPhotoData] = useState(null);
  const [isRearCamera, setIsRearCamera] = useState(false);
  const [temperature, setTemperature] = useState(null);
  const [location, setLocation] = useState(null);

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
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude, altitude } = position.coords;
            resolve({ latitude, longitude, altitude });
          },
          (error) => {
            reject(error);
          }
        );
      } else {
        reject('La geolocalización no está disponible en este navegador.');
      }
    });
  };

  const getWeather = async (latitude, longitude) => {
    const apiKey = '07f7c305df2ff65227a50af1a74782f7';
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

    try {
      const response = await fetch(weatherUrl);
      if (response.ok) {
        const data = await response.json();
        const currentTemperature = data.main.temp;
        setTemperature(currentTemperature);
      } else {
        console.error('Error al obtener la temperatura:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error al obtener la temperatura:', error);
    }
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

      const dataURL = canvas.toDataURL('image/png');
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
      const response = await axios.post('http://localhost:5000/upload', formData);
      formData.append('predict', response.data.message);
      
      const response2 = await fetch(`${URL}/upload`, {
        method: 'POST',
        body: formData,
      });
      
      // Manejar la respuesta del servidor si es necesario
      console.log('Respuesta de axios: ', response);
      alert('Respuesta del servidor: ' + response.data.message);
      console.log('Respuesta de fecth: ', response2);
    } catch (error) {
      console.error('Error al enviar la imagen al servidor:', error);
      alert('Error al enviar la imagen al servidor:' + error.message);
    }



    // try {
    //   // Enviar la solicitud POST al servidor
    //   const response = await fetch(`${URL}/upload`, {
    //     method: 'POST',
    //     body: formData,
    //   });

    //   // Verificar si la respuesta HTTP tiene éxito (código de estado 200)
    //   if (response.ok) {
    //     // Obtener los datos de la respuesta como objeto JSON
    //     const responseData = await response.json();

    //     // Acceder a la propiedad 'laprediccion' y mostrar su valor
    //     const laprediccion = responseData.laprediccion;
    //     console.log('Predicción del servidor:', laprediccion);
    //     alert('Predicción del servidor:' + laprediccion);
    //   } else {
    //     console.error('Error en la respuesta del servidor:', response.status, response.statusText);
    //     alert('Error en la respuesta del servidor:' + response.status + ' ' + response.statusText);
    //   }
    // } catch (error) {
    //   console.error('Error al enviar la imagen al servidor:', error);
    //   alert('Error al enviar la imagen al servidor:' + error.message);
    // }
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
      alert('Error accessing camera:' + error);
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

    // Llamar a getLocation para obtener la ubicación
    getLocation()
      .then((locationData) => {
        setLocation(locationData);

        // Obtener la temperatura utilizando las coordenadas de ubicación
        getWeather(locationData.latitude, locationData.longitude);
      })
      .catch((error) => {
        console.error('Error al obtener la ubicación:', error);
      });
  }, []); // ComponentDidMount


  return (

    <div style={{ position: 'relative' }}>
      {/*<p>Nombre de usuario: {user ? user.userName : 'No hay usuario logueado'} Correo: {user ? user.userEmail : 'No hay usuario logueado'}</p>*/}

      <video ref={videoRef} style={{ display: 'block', margin: '10px 0' }}></video>

      {/* Elementos de fecha y hora superpuestos */}
      <div style={{ position: 'absolute', top: '10px', left: '10px', color: 'white', fontSize: '16px' }}>
        {new Date().toLocaleString()}
        <br />
        {location && (
          <>
            Latitude: {location.latitude}
            <br />
            Longitude: {location.longitude}
            <br />
            {location.altitude !== null && (
              <>Altitude: {location.altitude} meters</>
            )}
            <br />
            {temperature !== null && (
              <>Temperature: {temperature} °C</>
            )}
          </>
        )}
      </div>

      {/* Elementos de fecha y hora superpuestos */}
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
