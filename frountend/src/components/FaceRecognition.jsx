import React, { useRef, useState, useEffect } from "react";
import * as faceapi from "@vladmandic/face-api";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const FaceRecognition = () => {
    const videoRef = useRef(null);
    const [recognizedFace, setRecognizedFace] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const loadModels = async () => {
            try {
                await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
                await faceapi.nets.faceRecognitionNet.loadFromUri("/models");
                await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
                await faceapi.nets.faceExpressionNet.loadFromUri("/models");
                await faceapi.nets.ssdMobilenetv1.loadFromUri("/models");
                console.log("Models loaded successfully");
                startVideo();
                setTimeout(() => {
                    if (!recognizedFace) {
                        setRecognizedFace("Face doesn't match");
                        console.log("Face doesn't match");
						alert("Face doesn't match");
                    }
                }, 10000);
            } catch (error) {
                console.error("Error loading models:", error);
            }
        };

        loadModels();
    }, [recognizedFace]);

    const startVideo = () => {
        navigator.mediaDevices
            .getUserMedia({ video: {} })
            .then((stream) => {
                videoRef.current.srcObject = stream;
                videoRef.current.onloadedmetadata = () => {
                    videoRef.current.play();
                    recognizeFace();
                };
            })
            .catch((err) => console.error("Error accessing webcam:", err));
    };

    const recognizeFace = async () => {
		const labeledDescriptors = await loadLabeledDescriptors();
		const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors, 0.6);
	
		setInterval(async () => {
			const detections = await faceapi
				.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
				.withFaceLandmarks()
				.withFaceDescriptors();
			const results = await Promise.all(
				detections.map((d) => faceMatcher.findBestMatch(d.descriptor))
			);
			const recognizedResult = results.find(
				(result) => result.label !== undefined
			);
	
			if (recognizedResult) {
				setRecognizedFace(recognizedResult.label);
				console.log("Face matched:", recognizedResult.label);
				Update(recognizedResult.label);
				alert(`Face matched: ${recognizedResult.label}`);
			} else {
				console.log("Face doesn't match");
				alert("Face doesn't match");
			}
		}, 100);
	};
	

    const loadLabeledDescriptors = async () => {
        const descriptors = [];

        // Avishkar
        const img1 = await faceapi.fetchImage("/Avishkar/1.jpg");
        const detections1 = await faceapi
            .detectSingleFace(img1)
            .withFaceLandmarks()
            .withFaceDescriptor();
        descriptors.push(
            new faceapi.LabeledFaceDescriptors("Avishkar", [detections1.descriptor])
        );

        // Saniya
        const img2 = await faceapi.fetchImage("/Saniya/1.jpg");
        const detections2 = await faceapi
            .detectSingleFace(img2)
            .withFaceLandmarks()
            .withFaceDescriptor();
        descriptors.push(
            new faceapi.LabeledFaceDescriptors("Saniya", [detections2.descriptor])
        );

        // Rushi
        const img3 = await faceapi.fetchImage("/Rushi/1.jpg");
        const detections3 = await faceapi
            .detectSingleFace(img3)
            .withFaceLandmarks()
            .withFaceDescriptor();
        descriptors.push(
            new faceapi.LabeledFaceDescriptors("Rushi", [detections3.descriptor])
        );

        return descriptors;
    };

    const Update = (label) => {
        let newId;
        switch (label) {
            case "Avishkar":
                newId = "6622de2b5185d1b53c619580";
                break;
            case "Saniya":
                newId = "66291aa7bc5c9b4004fc9207";
                break;
            case "Rushi":
                newId = "66291abebc5c9b4004fc920e";
                break;
            default:
                newId = id;
        }

        axios
            .put("http://localhost:4000/updateStudentF/" + newId, {
                attendance: "P",
            })
            .then((result) => {
                console.log(result);
                navigate("/Admin2");
                turnOffCamera();
            })
            .catch((err) => console.log(err));
    };

    const turnOffCamera = () => {
        const stream = videoRef.current.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
        videoRef.current.srcObject = null;
    };

    return (
        <div>
            <h1>Face Recognition</h1>
            <video
                ref={videoRef}
                autoPlay
                muted
                width="720"
                height="560"
            />
            {recognizedFace && <p>Recognized: {recognizedFace}</p>}
        </div>
    );
};

export default FaceRecognition;
