import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'

const Header = () => {
    
    const [users, setUsers] = useState([]);
	useEffect(() => {
		axios
			.get("http://localhost:4000")
			.then((users) => setUsers(users.data))
			.catch((err) => console.log(err));
	}, []);

    

    return (
        <div className='d-flex w-100 vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
						<th>Class</th>
						<th>RollNo</th>
						<th>Attendance</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map(user=>{
                            return <tr>
                                <td>{user.name}</td>
                                <td>{user.className}</td>
                                <td>{user.rollno}</td>
                                <td>{user.attendance}</td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
            </div>
        </div>
    );
};

export default Header;
