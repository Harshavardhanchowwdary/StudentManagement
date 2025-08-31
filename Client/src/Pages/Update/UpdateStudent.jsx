import React, { useState } from "react";
import "./UpdateStudent.css"; 
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {toast} from 'react-hot-toast'
function UpdateStudentDetails() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  const { id } = useParams();
  // handle change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/api/auth/UpdateStudent/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        navigate("/"); 
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };
  // Update 
  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/auth/UpdateStudent/${id}`);
        const data = await res.json();
        if (res.success) {
          setFormData({
            name: data.name,
            email: data.email,
            phone: data.phone,
            password: "", // keep password empty for security
          });
        } else {
          alert(data.message || "Failed to fetch student details");
        }
      } catch (error) {
        console.error("Error fetching student:", error);
      }
    };

    fetchStudent();
  }, [id]);
  return (
    <div className="MainContainer">
      <div className="register-container">
        <h2 className="register-heading">Update Student Details</h2>
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
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateStudentDetails;
