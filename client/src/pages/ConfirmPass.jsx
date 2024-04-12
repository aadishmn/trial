import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/ConfirmPass.css"; // Import ConfirmPass.css
import { Toast, notifySuccess, notifyError } from "../components/Toast";

const ConfirmPass = () => {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      notifyError("Passwords do not match");
      return;
    }
    try {
      const response = await axios.put(
        `http://localhost:5000/api/changepassword/${localStorage.getItem(
          "id"
        )}`,
        { password: newPassword }
      );
      if (response.status === 200) {
        notifySuccess("Password Updated Successfully !"); // Show success toast
        navigate("/login");
      } else {
        console.log(response);
        setErrorMessage("Internal Server Error");
      }
    } catch (error) {
      console.log(error);
      setErrorMessage("An error occurred while updating password");
      notifyError("An error occurred while updating password"); // Show error toast
    }
  };

  return (
    <div className="confirmPassContainer container">
      {" "}
      {/* Added container div */}
      <div className="confirmPassForm form-card">
        <form className="changePassForm" onSubmit={handleChangePassword}>
          <input
            type="password"
            placeholder="Enter New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="confirmPassInput form-control" // Added Bootstrap class
          />
          <br />
          <input
            type="password"
            placeholder="Re-enter New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="confirmPassInput form-control" // Added Bootstrap class
          />
          <br />
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button type="submit" id="confirm-btn" className="btn">
            Update Password
          </button>{" "}
          {/* Added Bootstrap classes */}
        </form>
      </div>
      <Toast /> {/* Include the Toast component */}
    </div>
  );
};

export default ConfirmPass;
