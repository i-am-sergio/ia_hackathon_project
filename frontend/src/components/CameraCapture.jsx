import { useRef, useState, useEffect } from 'react';
import { useUser } from '../UserHooking';
import { useNavigate } from "react-router-dom";
import { URL } from "../App";
const CameraCapture = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [photoData, setPhotoData] = useState(null);
  const [isRearCamera, setIsRearCamera] = useState(false);
  const [temperature, setTemperature] = useState(null);
  const [location, setLocation] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const getLocation = () => {
    return new Promise((resolve, reject) => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            const apiKey = 'de0eb6890a9d4a079feefc9fa227c2be';
            const geoUrl = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`;
            fetch(geoUrl)
              .then((response) => response.json())
              .then((data) => {
                const city = data.results[0].components.city;
                resolve({ city,latitude,longitude });
              })
              .catch((error) => {
                console.error('Error al obtener la ciudad:', error);
                reject(error);
              });
          },
          (error) => {
            console.error('Error en la geolocalización:', error);
            reject(error);
          }
        );
      } else {
        console.error('La geolocalización no está disponible en este navegador.');
        reject(new Error('Geolocalización no disponible'));
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
      const blob = await fetch(dataURL).then((res) => res.blob());
      const username = user.userName;
      const email = user.userEmail;
      try {
        const location = await getLocation();
        const phototime = currentTime.toLocaleString();
        const climaAsString = temperature.toString();
        sendImageToServer(blob, username, email, location.city, phototime, climaAsString);
      } catch (error) {
        console.error('Error al obtener ubicación, temperatura o al enviar la imagen:', error);
      }
    }
  };


  const sendImageToServer = async (imageBlob, username, email, location, phototime, temperature) => {
    const formData = new FormData();
    formData.append('photo', imageBlob, 'captured_photo.png');
    formData.append('username', username);
    formData.append('email', email);
    formData.append('lugar', location);
    formData.append('time', phototime);
    formData.append('clima', temperature);
    try {
      const response = await fetch(`${URL}/upload`, {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        const responseData = await response.json();
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
      if (videoDevices.length >= 2) {
        setIsRearCamera(true);
      } else {
        setIsRearCamera(false);
      }
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
    getLocation()
      .then((locationData) => {
        setLocation(locationData);
        getWeather(locationData.latitude, locationData.longitude);
      })
      .catch((error) => {
        console.error('Error al obtener la ubicación:', error);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  

  return (

    <div style={{ position: 'relative' }}>
      <video ref={videoRef} style={{ display: 'block', margin: '10px 0' }}></video>
      <div style={{ position: 'absolute', top: '10px', left: '10px', color: 'white', fontSize: '16px' }}>
        {currentTime.toLocaleString()}
        <br />
        Location: {location ? location.city : 'Loading...'}
        <br />
        Temperature: {temperature !== null ? temperature : 'Loading...'}
      </div>
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
      <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
    </div>
  );
};

export default CameraCapture;
