// WebcamEffect.js
import React, { useEffect, useRef } from "react";

function WebcamEffect() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    // Grayscale
    function applyGrayscaleEffect(context, video, canvas) {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      let imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      let data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        let brightness =
          0.34 * data[i] + 0.5 * data[i + 1] + 0.16 * data[i + 2];
        data[i] = brightness; // red
        data[i + 1] = brightness; // green
        data[i + 2] = brightness; // blue
      }

      context.putImageData(imageData, 0, 0);
      requestAnimationFrame(() => applyGrayscaleEffect(context, video, canvas));
    }

    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        video.srcObject = stream;
        video.play();
        requestAnimationFrame(applyGrayscaleEffect);
      })
      .catch((err) => {
        console.error("Error accessing the webcam", err);
      });

    return () => {
      video.srcObject.getTracks().forEach((track) => track.stop());
    };
  }, []);

  return (
    <div>
      <video ref={videoRef} style={{ display: "none" }} />
      <canvas ref={canvasRef} />
    </div>
  );
}

export default WebcamEffect;
