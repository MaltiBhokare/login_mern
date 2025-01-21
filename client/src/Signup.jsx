
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Signup.css";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    image: null,
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [previewImage, setPreviewImage] = useState(null);
  const [message, setMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false); // State to control popup visibility
  const [isRedirecting, setIsRedirecting] = useState(false); // State to manage the redirect
  const navigate = useNavigate();

  // Form validation logic
  const validate = () => {
    let formErrors = {};
    if (!formData.name.trim()) {
      formErrors.name = "Name is required.";
    }
    if (!formData.email) {
      formErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      formErrors.email = "Invalid email format.";
    }
    if (!formData.image) {
      formErrors.image = "Image is required.";
    }
    if (!formData.password) {
      formErrors.password = "Password is required.";
    } else if (formData.password.length < 8) {
      formErrors.password = "Password must be at least 8 characters.";
    }
    if (formData.confirmPassword !== formData.password) {
      formErrors.confirmPassword = "Passwords do not match.";
    }
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  // Handle text input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("password", formData.password);
      formDataToSend.append("confirmPassword", formData.confirmPassword);

      // Ensure image is appended before sending
      if (formData.image) {
        formDataToSend.append("image", formData.image);
      }

      try {
        const response = await axios.post("http://localhost:3001/signup", formDataToSend, {
          headers: {
            "Content-Type": "multipart/form-data", // Important for file upload
          },
        });

        // Handle server response
        if (response.status === 200 || response.status === 201) {
          setMessage("Signup successful! Redirecting...");
          setShowPopup(true); // Show the popup message
        } else {
          setMessage("Signup failed. Please try again.");
        }

        // Reset form fields after submission
        setFormData({
          name: "",
          email: "",
          image: null,
          password: "",
          confirmPassword: "",
        });
        setPreviewImage(null);
      } catch (error) {
        console.error("Error during signup:", error.response || error);
        setMessage("Server error. Please try again later.");
      }
    }
  };

  // Handle closing the popup and redirecting to login page
  const handleClosePopup = () => {
    setShowPopup(false);
    setIsRedirecting(true); // Set state to trigger the redirect
  };

  // Redirect to login page if needed
  if (isRedirecting) {
    navigate("/login");
  }

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? "error-input" : ""}
          />
          {errors.name && <small className="error-message">{errors.name}</small>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? "error-input" : ""}
          />
          {errors.email && <small className="error-message">{errors.email}</small>}
        </div>

        <div className="form-group">
          <label htmlFor="image">Upload Image</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            className={errors.image ? "error-input" : ""}
          />
          {errors.image && <small className="error-message">{errors.image}</small>}
          {previewImage && (
            <div className="image-preview">
              <img src={previewImage} alt="Preview" />
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={errors.password ? "error-input" : ""}
          />
          {errors.password && <small className="error-message">{errors.password}</small>}
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={errors.confirmPassword ? "error-input" : ""}
          />
          {errors.confirmPassword && (
            <small className="error-message">{errors.confirmPassword}</small>
          )}
        </div>

        <button type="submit" className="btn-submit">
          Signup
        </button>
      </form>

      {/* Display the popup message conditionally */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <p>{message}</p>
            <button onClick={handleClosePopup}>Close</button>
          </div>
        </div>
      )}

      <div className="login-redirect">
        <p>
          Already have an account?{" "}
          <button className="link-btn" onClick={() => navigate("/login")}>
            Login here
          </button>
        </p>
      </div>
    </div>
  );
}

export default Signup;
