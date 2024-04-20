import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function UpdateStudent(){
    const {id} = useParams()
    const [name, setName] = useState()
    const [className, setClassName] = useState()
    const [rollno, setRollNo] = useState()
    const [attendance, setAttendance] = useState()
    const navigate = useNavigate()
    

    useEffect(() => {
		axios
			.get("http://localhost:4000/getStudent/"+id)
			.then(result => {console.log(result)
                setName(result.data.name)
                setClassName(result.data.className)
                setRollNo(result.data.rollno)
            })
			.catch((err) => console.log(err));
	}, []);

    const Update = (e) =>{
        e.preventDefault();
        axios.put("http://localhost:4000/updateStudent/"+id, {name, className, rollno ,attendance})
        .then(result =>{
            console.log(result)
            navigate('/Admin2')
        })
        .catch(err => console.log(err))
    }

    return(
        <div className='d-flex w-100 vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <form onSubmit={Update}>
                    <h2>Update Student</h2>
                    <div className="mb-2">
                        <label htmlFor="">Name</label>
                        <input type="text" placeholder="Enter Name" className="form-control"
                        value = {name} onChange={(e) => setName(e.target.value)} />
                        
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Class</label>
                        <input type="text" placeholder="Enter Class" className="form-control"
                        value = {className} onChange={(e) => setClassName(e.target.value)} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">RollNo</label>
                        <input type="text" placeholder="Enter RollNo" className="form-control"
                        value = {rollno} onChange={(e) => setRollNo(e.target.value)} />

                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Attendance</label>
                        <input type="text" placeholder="Enter P/A" className="form-control"
                        value = {attendance} onChange={(e) => setAttendance(e.target.value)} />
                    </div>
                    <button className="btn btn-success">Update</button>
                </form>
            </div>

        </div>
    )
}

export default UpdateStudent;