/** @format */

import React, { useRef, useState, useEffect } from "react";
import * as faceapi from "@vladmandic/face-api";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const FaceRecognition = () => {
	const videoRef = useRef(null);
	const [recognizedFace, setRecognizedFace] = useState(null);
	const navigate = useNavigate();
	const { id } = useParams();
	const [attendance, setAttendance] = useState();

	useEffect(() => {
		axios
			.get("http://localhost:4000/getStudent/" + id)
			.then((result) => {
				console.log(result);
				setAttendance(result.data.attendance);
			})
			.catch((err) => console.log(err));
	}, [id]);

	const Update = (label) => {
		let newId;
		switch (label) {
			case "Avishkar":
				newId = "6622de2b5185d1b53c619580";
				break;
			case "Saniya":
				newId = "662425b4a9a27f075d31557b";
				break;
			case "Rushi":
				newId = "662425c2a9a27f075d31557f";
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

	useEffect(() => {
		const loadModels = async () => {
			try {
				await Promise.all([
					faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
					faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
					faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
					faceapi.nets.faceExpressionNet.loadFromUri("/models"),
					faceapi.nets.ssdMobilenetv1.loadFromUri("./models"),
				]);
				console.log("Models loaded successfully");
				startVideo();
				setTimeout(recognizeFace, 1000);
			} catch (error) {
				console.error("Error loading models:", error);
			}
		};

		loadModels();

		const videoElement = videoRef.current;
		if (videoElement) {
			videoElement.onloadedmetadata = () => {
				recognizeFace();
			};
		}
	}, []);

	const startVideo = () => {
		navigator.mediaDevices
			.getUserMedia({ video: {} })
			.then((stream) => {
				videoRef.current.srcObject = stream;
			})
			.catch((err) => console.error("Error accessing webcam:", err));
	};

	const recognizeFace = async () => {
		const labeledDescriptors = await loadLabeledDescriptors();
		const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors, 0.6);

		const canvas = faceapi.createCanvasFromMedia(videoRef.current);
		const displaySize = {
			width: videoRef.current.width,
			height: videoRef.current.height,
		};
		faceapi.matchDimensions(canvas, displaySize);

		setInterval(async () => {
			const detections = await faceapi
				.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
				.withFaceLandmarks()
				.withFaceDescriptors();
			const resizedDetections = faceapi.resizeResults(detections, displaySize);
			canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
			const results = resizedDetections.map((d) =>
				faceMatcher.findBestMatch(d.descriptor)
			);
			const recognizedResult = results.find(
				(result) => result.label !== undefined
			);

			if (recognizedResult) {
				if (recognizedResult.label === "Avishkar") {
					setRecognizedFace("Avishkar");
				} else if (recognizedResult.label === "Saniya") {
					setRecognizedFace("Saniya");
				} else if (recognizedResult.label === "Rushi") {
					setRecognizedFace("Rushi");
				}
				alert(`Face match: ${recognizedResult.label}`);
				Update(recognizedResult.label);
			} else {
				setRecognizedFace(null);
			}

			faceapi.draw.drawDetections(canvas, resizedDetections);
		}, 100);
	};

	const loadLabeledDescriptors = async () => {
		const descriptors = [];
		const img1 = await faceapi.fetchImage("/Avishkar/1.jpg");
		const detections1 = await faceapi
			.detectSingleFace(img1)
			.withFaceLandmarks()
			.withFaceDescriptor();
		descriptors.push(
			new faceapi.LabeledFaceDescriptors("Avishkar", [detections1.descriptor])
		);

		const img2 = await faceapi.fetchImage("/Saniya/1.jpg");
		const detections2 = await faceapi
			.detectSingleFace(img2)
			.withFaceLandmarks()
			.withFaceDescriptor();
		descriptors.push(
			new faceapi.LabeledFaceDescriptors("Saniya", [detections2.descriptor])
		);

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

	useEffect(() => {
		startVideo();
		setTimeout(recognizeFace, 1000);
	}, []);

	return (
		<div>
			<h1>Face Recognition</h1>
			<video
				ref={videoRef}
				autoPlay
				muted
				width='720'
				height='560'
			/>
			{recognizedFace && <p>Recognized: {recognizedFace}</p>}
		</div>
	);
};

export default FaceRecognition;
