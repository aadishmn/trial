import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import registrationImage from "../styles/Images/img2.svg"; // Import the image
import "../styles/RegistrationForm.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegistrationForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("intern"); // Default role is intern
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Access the navigate function

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }

      const response = await axios.post("http://localhost:5000/api/signu", {
        firstName,
        lastName,
        email,
        password,
        role,
      });
      const { token, isAdmin, id, hasChanged } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("id", id);
      localStorage.setItem("role", role);
      toast.success("Registration successful");

      // You might want to handle this differently depending on your app's logic
      navigate("/home"); // Navigate to home page after registration
    } catch (error) {
      setError("Registration failed");
      toast.error("Registration failed");
    }
  };

  return (
    <div className="registrationContainer mt-5">
      <div className="row justify-content-center">
        <div className="registrationFormCol">
          <div className="card">
            <div className="card-body registrationCardBody">
              <div className="col-md-6">
                <img
                  src={registrationImage}
                  alt="Registration"
                  className="registrationImage img-fluid"
                />
              </div>
              <div className="col-md-6">
                <h3 className="card-title text-center mb-4">Register</h3>
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="inputFirstName" className="form-label">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputFirstName"
                      placeholder="Enter first name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="inputLastName" className="form-label">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputLastName"
                      placeholder="Enter last name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="inputEmail" className="form-label">
                      Email address
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="inputEmail"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="inputPassword" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="inputPassword"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="confirmPassword"
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="selectRole" className="form-label">
                      Role
                    </label>
                    <select
                      className="form-select"
                      id="selectRole"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    >
                      <option value="intern">Intern</option>
                      <option value="tribe_master">Tribe Master</option>
                      <option value="software_developer">
                        Software Developer
                      </option>
                      <option value="consultant">Consultant</option>
                    </select>
                  </div>
                  <button type="submit" id="registerBtn" className="btn w-100">
                    Register
                  </button>
                </form>
                <div className="text-center mt-3">
                  <Link to="/login">Login</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
