/** @format */

import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import io from "socket.io-client";
import { animateScroll as scroll } from "react-scroll";

import "bootstrap/dist/css/bootstrap.min.css";
import "./Admin2.css";

const Admin2 = () => {
	const [users, setUsers] = useState([]);
	const [tagID, setTagID] = useState(null);
	const socket = io("http://localhost:4000");
	const tableContainerRef = useRef(null); // Reference to the table container element
	const tableRef = useRef(null); // Reference to the table element

	useEffect(() => {
		axios
			.get("http://localhost:4000")
			.then((response) => setUsers(response.data))
			.catch((error) => console.log(error));

		axios
			.get("http://localhost:4000/tagID")
			.then((response) => {
				console.log("Tag ID from backend:", response.data.tagID);
				setTagID(response.data.tagID);

				const tagIDs = response.data.tagID;
				const idMappings = {
					"5000DAD290C8": "6622de2b5185d1b53c619580",
					"5000DB0CCF48": "66291aa7bc5c9b4004fc9207",
					"5000DAFAFD8D": "66291abebc5c9b4004fc920e",
				};

				users.forEach((user) => {
					const userID = idMappings[user._id];
					if (tagIDs.includes(user.tagID) && userID) {
						axios
							.put("http://localhost:4000/updateStudentF/" + userID, {
								attendance: "P",
							})
							.then((response) =>
								console.log("Attendance updated for", user.name)
							)
							.catch((error) =>
								console.error("Error updating attendance for", user.name, error)
							);
					}
				});
			})
			.catch((error) => {
				console.log("Error fetching tagID from backend:", error);
			});

		return () => {
			socket.disconnect();
		};
	}, [socket, users]);

	const handleDelete = (id) => {
		axios
			.delete(`http://localhost:4000/deleteStudent/${id}`)
			.then((response) => {
				console.log(response);
				window.location.reload();
			})
			.catch((error) => console.log(error));
	};

	const handleResetAttendance = () => {
		users.forEach((user) => {
			axios
				.put("http://localhost:4000/updateStudentF/" + user._id, {
					attendance: " ",
				})
				.then((response) => console.log("Attendance reset for", user.name))
				.catch((error) =>
					console.error("Error resetting attendance for", user.name, error)
				);
		});
	};



	return (
		<div className='d-flex flex-column w-100 vh-100 bg-primary justify-content-center align-items-center'>
			<div className='w-50 bg-white rounded p-3'>
				<Link
					to='/create'
					className='btn btn-success'>
					Add +
				</Link>
				<Link
					to='/face-recognition'
					className='btn btn-primary ml-2'>
					Face Recognition
				</Link>
				<button
					onClick={handleResetAttendance}
					className='btn btn-warning ml-2'>
					Reset Attendance
				</button>
				{tagID && (
					<div
						className='alert alert-info mt-3'
						role='alert'>
						Received Tag ID: {tagID}
					</div>
				)}
				<div
					ref={tableContainerRef}
					style={{ maxHeight: "300px", overflowY: "auto" }} // Apply custom styling for scrolling
					className='mt-3'>
					<table
						ref={tableRef}
						className='table'>
						<thead>
							<tr>
								<th>Name</th>
								<th>Class</th>
								<th>RollNo</th>
								<th>Attendance</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{users.map((user) => (
								<tr key={user._id}>
									<td>{user.name}</td>
									<td>{user.className}</td>
									<td>{user.rollno}</td>
									<td>{user.attendance}</td>
									<td>
										<div className='d-flex flex-column'>
											<Link
												to={`/update/${user._id}`}
												className='btn btn-success'>
												Update
											</Link>
											<button
												className='btn btn-danger mt-2'
												onClick={() => handleDelete(user._id)}>
												Delete
											</button>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default Admin2;
