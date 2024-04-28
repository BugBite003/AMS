import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import io from "socket.io-client";

import "bootstrap/dist/css/bootstrap.min.css";
import "./Admin2.css";

const Admin2 = () => {
	const [users, setUsers] = useState([]);
	const [tagID, setTagID] = useState(null); // State to store the received tag ID
	const socket = io("http://localhost:4000"); // Initialize socket connection

	useEffect(() => {
		// Fetch users data from the server
		axios
			.get("http://localhost:4000")
			.then((response) => setUsers(response.data))
			.catch((error) => console.log(error));
	
		// Fetch tagID from the backend
		axios
			.get("http://localhost:4000/tagID")
			.then((response) => {
				console.log("Tag ID from backend:", response.data.tagID);
				setTagID(response.data.tagID);

				// Assign tag IDs to corresponding MongoDB IDs
				const tagIDs = response.data.tagID;
				const idMappings = {
					"5000DAD290C8": "6622de2b5185d1b53c619580", // Avishkar
					"5000DB0CCF48": "66291aa7bc5c9b4004fc9207", // Saniya
					"5000DAFAFD8D": "66291abebc5c9b4004fc920e" // Rushi
				};

				// Update the attendance for each user if their tag ID matches
				users.forEach((user) => {
					const userID = idMappings[user._id];
					if (tagIDs.includes(user.tagID) && userID) {
						axios.put("http://localhost:4000/updateStudentF/" + userID, { attendance: "P" })
							.then((response) => console.log("Attendance updated for", user.name))
							.catch((error) => console.error("Error updating attendance for", user.name, error));
					}
				});
			})
			.catch((error) => {
				console.log("Error fetching tagID from backend:", error);
			});
	
		// Cleanup function to disconnect socket on component unmount
		return () => {
			socket.disconnect();
		};
	}, [socket, users]);

	const handleDelete = (id) => {
		// Delete user with the given ID
		axios
			.delete(`http://localhost:4000/deleteStudent/${id}`)
			.then((response) => {
				console.log(response);
				window.location.reload(); // Reload the page after deletion
			})
			.catch((error) => console.log(error));
	};

	return (
		<div className='d-flex w-100 vh-100 bg-primary justify-content-center align-items-center'>
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
				{tagID && (
					// Render tag ID if available
					<div
						className='alert alert-info mt-3'
						role='alert'>
						Received Tag ID: {tagID}
					</div>
				)}
				<table className='table mt-3'>
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
	);
};

export default Admin2;
