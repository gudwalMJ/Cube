import { useCallback, useEffect, useRef, useState } from "react";

export const useWebcamCapture = (stickerImg, title, filter) => {
  const [videoRef, setVideoRef] = useState();
  const [canvasRef, setCanvasRef] = useState();
  const [pictures, setPictures] = useState([]);

  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (videoRef && canvasRef && !initialized) {
      navigator.mediaDevices
        .getUserMedia({
          video: {
            width: { min: 1024, ideal: 1280, max: 1920 },
            height: { min: 576, ideal: 720, max: 1080 },
          },
          audio: false,
        })
        .then(function (stream) {
          videoRef.srcObject = stream;
          videoRef.play();
        })
        .catch(function (err) {
          console.log("Couldn't start webcam: " + err);
        });

      const onCanPlay = function (ev) {
        const width = videoRef.videoWidth;
        const height = videoRef.videoHeight / (videoRef.videoWidth / width);

        videoRef.setAttribute("width", width);
        videoRef.setAttribute("height", height);
        canvasRef.setAttribute("width", width);
        canvasRef.setAttribute("height", height);
        videoRef.removeEventListener("canplay", onCanPlay, false);
      };

      videoRef.addEventListener("canplay", onCanPlay, false);
      setInitialized(true);
    } else if (!videoRef || !canvasRef) {
      setInitialized(false);
    }
  }, [videoRef, canvasRef, initialized]);

  //FILTER
  useEffect(() => {
    const appliedFilter = filter || "none";
    if (videoRef) {
      videoRef.style.filter = appliedFilter;
    }
    if (canvasRef) {
      canvasRef.style.filter = appliedFilter;
    }
  }, [filter, videoRef, canvasRef]);

  const mousePos = useRef({ x: 0, y: 0 });

  const startRenderLoop = useCallback(() => {
    if (canvasRef && videoRef) {
      const renderFrame = () => {
        const ctx = canvasRef.getContext("2d");
        const width = canvasRef.getAttribute("width");
        const height = canvasRef.getAttribute("height");
        if (filter) {
          ctx.filter = filter;
        }
        ctx.drawImage(videoRef, 0, 0, width, height);
        ctx.filter = "none";

        if (
          stickerImg &&
          stickerImg.complete &&
          stickerImg.naturalHeight !== 0
        ) {
          const bb = canvasRef.getBoundingClientRect();
          const x = ((mousePos.current.x - bb.left) / bb.width) * width;
          const y = ((mousePos.current.y - bb.top) / bb.height) * height;
          ctx.drawImage(
            stickerImg,
            x - width * 0.1,
            y - width * 0.1,
            width * 0.2,
            width * 0.2
          );
        }
        requestAnimationFrame(renderFrame);
      };
      requestAnimationFrame(renderFrame);
    }
  }, [canvasRef, videoRef, stickerImg, filter]);

  useEffect(() => {
    startRenderLoop();
  }, [startRenderLoop]);

  useEffect(() => {
    if (canvasRef) {
      const onMouseMove = (ev) => {
        mousePos.current = { x: ev.clientX, y: ev.clientY };
      };
      canvasRef.addEventListener("mousemove", onMouseMove);
      canvasRef.addEventListener("mousedown", onMouseMove);
      return () => {
        canvasRef.removeEventListener("mousemove", onMouseMove);
        canvasRef.removeEventListener("mousedown", onMouseMove);
      };
    }
  }, [canvasRef]);

  const onCapture = useCallback(() => {
    if (canvasRef) {
      const data = canvasRef.toDataURL("image/png");
      // Append new picture to the array instead of replacing
      setPictures((previousPictures) => [
        ...previousPictures,
        { dataUri: data, title },
      ]);
    }
  }, [canvasRef, title]);

  return [setVideoRef, setCanvasRef, onCapture, pictures, setPictures];
};
