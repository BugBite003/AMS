/** @format */

import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Admin2.css";

const Admin2 = () => {
	const [studentDataArr, setStudentDataArr] = useState([]);

	useEffect(() => {
		const data = JSON.parse(localStorage.getItem("studentData")) || [];
		setStudentDataArr(data);
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();

		const name = e.target.name.value;
		const number = e.target.number.value;
		const city = e.target.city.value;
		const rollNo = e.target.rollNo.value;

		const newStudent = {
			name,
			number,
			city,
			rollNo,
			attendance: "", // Changed property name to "attendance"
		};

		const updatedStudentDataArr = [...studentDataArr, newStudent];
		setStudentDataArr(updatedStudentDataArr);
		localStorage.setItem("studentData", JSON.stringify(updatedStudentDataArr));

		e.target.reset();
		alert("Student Added Successfully");
	};

	const handleAttendanceUpdate = (index, attendance) => {
		const updatedStudentDataArr = [...studentDataArr];
		updatedStudentDataArr[index].attendance = attendance; // Changed property name to "attendance"
		setStudentDataArr(updatedStudentDataArr);
		localStorage.setItem("studentData", JSON.stringify(updatedStudentDataArr));
	};

	const handleDelete = (index) => {
		const updatedStudentDataArr = studentDataArr.filter((_, i) => i !== index);
		setStudentDataArr(updatedStudentDataArr);
		localStorage.setItem("studentData", JSON.stringify(updatedStudentDataArr));
	};

	return (
		<div>
			<h1>Student Management</h1>
			<div className='studentData'>
				<form onSubmit={handleSubmit}>
					<input
						type='text'
						placeholder='Name'
						name='name'
						required
					/>
					<input
						type='number'
						placeholder='Number'
						name='number'
						required
					/>
					<input
						type='text'
						placeholder='City'
						name='city'
						required
					/>
					<input
						type='number'
						placeholder='Roll No'
						name='rollNo'
						required
					/>
					<input
						type='submit'
						className='btn btn-warning'
						value='Add Student'
					/>
				</form>
			</div>

			<table className='table'>
				<thead>
					<tr>
						<th>#</th>
						<th>Name</th>
						<th>Number</th>
						<th>City</th>
						<th>Roll No.</th>
						<th>Attendance</th> {/* Changed from "Stuse" to "Attendance" */}
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{studentDataArr.map((student, index) => (
						<tr key={index}>
							<td>{index + 1}</td>
							<td>{student.name}</td>
							<td>{student.number}</td>
							<td>{student.city}</td>
							<td>{student.rollNo}</td>
							<td>{student.attendance}</td>{" "}
							{/* Changed property name to "attendance" */}
							<td>
								<button onClick={() => handleAttendanceUpdate(index, "A")}>
									A
								</button>{" "}
								{/* Changed from "A" to "P" */}
								<button onClick={() => handleAttendanceUpdate(index, "P")}>
									P
								</button>{" "}
								{/* Changed from "B" to "P" */}
								<button onClick={() => handleDelete(index)}>Delete</button>{" "}
								{/* Changed from "Delete" to "Delete" */}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Admin2;
