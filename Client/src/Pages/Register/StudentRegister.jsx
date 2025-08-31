import React, { useState } from "react";
import "./StudentRegister.css";
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-hot-toast'
function StudentRegister() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
    });

    // handle change for inputs
    const handleChange = (e) => {
        let value = e.target.value;
        const name = e.target.name;
        setFormData({ ...formData, [name]: value });
    };

    // handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        const Url = "http://localhost:5000/api/auth/StudentRegister";
        const StudentRegister = await fetch(Url,{
            method:"POST",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify(formData)
        })

        const Response = await StudentRegister.json();
        // Verifying 
        if(Response.success){
            navigate('/')
        }else{
            toast.error(Response.message);
        }
        setFormData({name:"",email:"",password:"",phone:""})
    };

    return (
        <div className="MainContainer">
            <div className="register-container">
                <h2 className="register-heading">Student Registration</h2>
                <form className="register-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="register-input"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="register-input"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="register-input"
                        required
                    />
                    <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={handleChange}
                        className="register-input"
                        required
                    />
                    <button type="submit" className="register-button">
                        Register
                    </button>
                </form>
            </div>

        </div>
    );
}

export default StudentRegister;
