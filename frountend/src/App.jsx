/** @format */

//import logo from './logo.svg';
import React from 'react';

import "./App.css";
import Header from "file:///C:/Users/Admin/OneDrive/Desktop/AMS/frountend/src/components/Header.js";
import Login from "file:///C:/Users/Admin/OneDrive/Desktop/AMS/frountend/src/components/login.js";
import Admin2 from "file:///C:/Users/Admin/OneDrive/Desktop/AMS/frountend/src/components/Admin2.js"
import Dashboard from 'file:///C:/Users/Admin/OneDrive/Desktop/AMS/frountend/src/components/Dashboard.jsx';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/dashboard" element={<Dashboard />} />
				<Route path="/admin2" element={<Admin2 />} />
				<Route path="/header" element={<Header />} />
			</Routes>
		</Router>
	);
}

export default App;
