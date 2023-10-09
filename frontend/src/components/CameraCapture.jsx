import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';

const CameraCapture = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [photoData, setPhotoData] = useState(null);
  const [isRearCamera, setIsRearCamera] = useState(false);

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
      console.log('Tipo MIME:', blob.type);
      // Enviar la imagen al servidor
      sendImageToServer(blob);
    }
  };

  const sendImageToServer = async (imageBlob) => {
    const formData = new FormData();
    formData.append('photo', imageBlob, 'captured_photo.png');
  
    try {
      const response = await axios.post('http://localhost:5000/upload', formData);
  
      // Manejar la respuesta del servidor si es necesario
      console.log('Respuesta del servidor:', response);
      alert('Respuesta del servidor:' + JSON.stringify(response.data));
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
      <video ref={videoRef} style={{ display: 'block', margin: '10px 0' }}></video>
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
