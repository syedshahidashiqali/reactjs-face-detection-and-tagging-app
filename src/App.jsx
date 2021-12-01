import { useRef, useEffect } from 'react';
import './App.css';
import * as faceapi from "face-api.js";

function App() {

  const imgRef = useRef();
  const canvasRef = useRef();

  const handleImage = async() => {
    // async because face detection takes time
    const detections = await faceapi
      .detectAllFaces(imgRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceExpressions();

      canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(imgRef.current);
      faceapi.matchDimensions(canvasRef.current, {
        width: 940,
        height: 650,
      });

      const resizedDetections = faceapi.resizeResults(detections, {
        width: 940,
        height: 650,
      })

      faceapi.draw.drawDetections(canvasRef.current, resizedDetections);

      faceapi.draw.drawFaceExpressions(canvasRef.current, resizedDetections);
  }

  useEffect(() => {
    const loadModels = () => {
      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
        faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
        faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
        faceapi.nets.faceExpressionNet.loadFromUri("/models"),
      ])
        .then(handleImage)
        .catch(err => console.log(err))
    }
    imgRef.current && loadModels();
  }, [])
  return (
    <div className="app">
      <img 
        ref={imgRef}
        src="https://www.rivermendhealth.com/wp-content/uploads/2018/05/smiling-faces.jpg"
        alt=""
        width="940"
        height="650"
        crossOrigin="anonymous"
      />
      <canvas ref={canvasRef} width={940} height={650} />
    </div>
  );
};

export default App;
