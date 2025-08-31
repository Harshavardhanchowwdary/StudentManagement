import React, { useEffect, useState } from 'react';
import './Homepage.css';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
function Homepage() {
  const navigate = useNavigate()
  const [studentdetails, setStudentDetails] = useState([]);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
    localStorage.setItem("theme", theme);
  }, [theme])
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/auth/getAllstudents");
        const data = await response.json();

        if (data.success) {
          setStudentDetails(data.data);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, []);

  const StudentDelete = async (id) => {
    try {
      const deletestudent = await fetch(
        `http://localhost:5000/api/auth/DeleteStudent/${id}`,
        { method: "DELETE" }
      );

      const Response = await deletestudent.json();

      if (Response.success) {
        toast.success("Student Deleted Successfully");

        // Update state without re-fetching
        const UpdatedStudentList = studentdetails.filter(
          (student) => student._id !== id
        );
        setStudentDetails(UpdatedStudentList);
      } else {
        toast.error(Response.message);
      }
    } catch (error) {
      toast.error("Error deleting student");
      console.error(error);
    }
  };

  const handleUpdate = (id) => {
    navigate(`/UpdateStudentDetails/${id}`);
  };

  return (
    <div className="MainContainer">
      <div className="student-container">
        <button
          className="toggle-btn"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? "🌞 Switch to Light" : "🌙 Switch to Dark"}
        </button>
        <button
          className="register-btn"
          onClick={() => navigate("/StudentRegister")}
        >
          Register Student
        </button>
        <h2 className="student-heading">All Students</h2>
        <div className="student-list">
          {studentdetails.map((student, index) => (
            <div key={student._id || index} className="student-card">
              <p><strong>Name:</strong> {student.name}</p>
              <p><strong>Email:</strong> {student.email}</p>
              <p><strong>Phone:</strong> {student.phone}</p>

              <div className="student-actions">
                <button
                  className="update-button"
                  onClick={() => handleUpdate(student._id)}
                >
                  Update
                </button>
                <button
                  className="delete-button"
                  onClick={() => StudentDelete(student._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Homepage;
