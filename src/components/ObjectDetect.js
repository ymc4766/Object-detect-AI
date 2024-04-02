import React, { useEffect, useRef, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import * as webgl from "@tensorflow/tfjs-backend-webgl";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import Webcam from "react-webcam";
import { drawRect } from "../utils/drawUtils";
// import drawRect from "../utils";

const ObjectDetect = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [model, setModel] = useState(null);
  const [image, setImage] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [imagePrev, setImagePrev] = useState(null);
  const [showPrediction, setShowPrediction] = useState(false);

  useEffect(() => {
    async function loadModel() {
      const loadedModel = await cocoSsd.load();
      setModel(loadedModel);
      setIsLoading(false);
      console.log("Model loaded:", loadedModel); // Log model loaded
    }
    loadModel();
  }, []);

  const runCoco = async () => {
    const net = await cocoSsd.load();

    setInterval(() => {
      detect(net);
    }, 20);
  };

  const detect = async (net) => {
    if (
      typeof webcamRef.current !== undefined &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // set video Width

      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // make detection
      const obj = await net.detect(video);
      console.log("obj", obj);

      // draw mesh
      const ctx = canvasRef.current.getContext("2d");

      // draw border box
      drawRect(obj, ctx);
    }
  };

  useEffect(() => {
    runCoco();
  }, []);

  return (
    <section className="bg-gray-200 text-gray-800 p-4 px-6 relative">
      <div className="max-w-[1200px] justify-center">
        <h1 className="text-2xl">
          Object Detection Using Pre-trained Model in TensorFlow.js
        </h1>
        <p>
          This application allows you to upload an image and detects objects
          within it using a pre-trained model in TensorFlow.js.
        </p>
      </div>

      <div className="flex  justify-center py-3 relative">
        {/* <video ref={webcamRef} autoPlay width="650" height="450" /> */}
        <Webcam
          ref={webcamRef}
          muted={true}
          style={{
            zindex: 9,
            width: "auto",
            height: 580,
          }}
        />
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            zindex: 8,
            width: 640,
            height: 480,
          }}
        />
      </div>
    </section>
  );
};

export default ObjectDetect;
