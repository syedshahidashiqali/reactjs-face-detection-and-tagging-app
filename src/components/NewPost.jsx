import { useRef, useEffect } from 'react';
import * as faceapi from "face-api.js";


const NewPost = () => {

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
  
        // face detection i.e rectangle around the face
        faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
  
        // face expression i.e happy or something else
        faceapi.draw.drawFaceExpressions(canvasRef.current, resizedDetections);
  
        // face landmarks i.e outline of face in dotted format
        faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections);
  
    }
  
    useEffect(() => {
      const loadModels = () => {
        Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
          faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
          faceapi.nets.faceExpressionNet.loadFromUri("/models"),
        ])
          .then(handleImage)
          .catch(err => console.log(err))
      }
      imgRef.current && loadModels();
    }, []);

  return (
    <div>
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

export default NewPost;
