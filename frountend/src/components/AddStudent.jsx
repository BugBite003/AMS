import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
function AddStudent(){
    const {id} = useParams()
    const [name, setName] = useState()
    const [className, setClassName] = useState()
    const [rollno, setRollNo] = useState()
    
    const navigate = useNavigate()

    const Submit = (e) =>{
        e.preventDefault();
        axios.post("http://localhost:4000/addStudent", {name, className, rollno})
        .then(result =>{
            console.log(result)
            navigate('/Admin2')
        })
        .catch(err => console.log(err))
    }
    return(
        <div className='d-flex w-100 vh-100 bg-primary justify-content-center align-items-center'>
			<div className='w-50 bg-white rounded p-3'>
                <form onSubmit={Submit}>
                    <h2>Add Student</h2>
                    <div className="mb-2">
                        <label htmlFor="">Name</label>
                        <input type="text" placeholder="Enter Name" className="form-control" 
                        onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Class</label>
                        <input type="text" placeholder="Enter Class" className="form-control"
                        onChange={(e) => setClassName(e.target.value)} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">RollNo</label>
                        <input type="text" placeholder="Enter RollNo" className="form-control"
                        onChange={(e) => setRollNo(e.target.value)} />

                    </div>
                    <button className="btn btn-success">Submit</button>
                </form>
            </div>

        </div>
    )
}

export default AddStudent;