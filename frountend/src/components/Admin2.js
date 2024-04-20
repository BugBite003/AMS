import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./Admin2.css";

const Admin2 = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:4000")
            .then((response) => setUsers(response.data))
            .catch((error) => console.log(error));
    }, []);

    const handleDelete = (id) => {
        axios
            .delete(`http://localhost:4000/deleteStudent/${id}`)
            .then((response) => {
                console.log(response);
                window.location.reload();
            })
            .catch((error) => console.log(error));
    };

    return (
        <div className="d-flex w-100 vh-100 bg-primary justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-3">
                <Link to="/create" className="btn btn-success">
                    Add +
                </Link>
                <Link to="/face-recognition" className="btn btn-primary ml-2">
                    Face Recognition
                </Link>
                <table className="table">
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
                                    <Link to={`/update/${user._id}`} className="btn btn-success">
                                        Update
                                    </Link>
                                    <button
                                        className="btn btn-danger ml-2"
                                        onClick={() => handleDelete(user._id)}
                                    >
                                        Delete
                                    </button>
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
