/** @format */

//import logo from './logo.svg';
import React from 'react';

import "./App.css";
import Header from "file:///C:/Users/Admin/OneDrive/Desktop/AMS/frountend/src/components/Header.js";
import Login from "file:///C:/Users/Admin/OneDrive/Desktop/AMS/frountend/src/components/login.js";
import Admin2 from "file:///C:/Users/Admin/OneDrive/Desktop/AMS/frountend/src/components/Admin2.js"
import AddStudent from "file:///C:/Users/Admin/OneDrive/Desktop/AMS/frountend/src/components/AddStudent.jsx"
import UpdateStudent from "file:///C:/Users/Admin/OneDrive/Desktop/AMS/frountend/src/components/UpdateStudent.jsx"
import FaceRecognition from "file:///C:/Users/Admin/OneDrive/Desktop/AMS/frountend/src/components/FaceRecognition.jsx"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";



function App() {
	return (
		<div>
			<Router>
				<Routes>
					<Route path="/" element={<Login />} />
					<Route path="/create" element={<AddStudent />} />
					<Route path="/update/:id" element={<UpdateStudent />} />
					<Route path="/admin2" element={<Admin2 />} />
					<Route path="/header" element={<Header />} />
					<Route path="/face-recognition" element={<FaceRecognition />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
