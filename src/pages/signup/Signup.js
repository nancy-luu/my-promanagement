import React, { useState, useRef } from "react";
import { useSignup } from "../../hooks/useSignup";
import { categories } from "../../util/categories";

// styles
import "./Signup.css";
import Select from "react-select";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailError, setThumbnailError] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState("");
  const [department, setDepartment] = useState("");
  const [role, setRole] = useState("");
  const { signup, isPending, error } = useSignup();
  const fileInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(email, password, displayName, thumbnail, department, role);
  };

  const handleButtonClick = () => {
    fileInputRef.current.click(); // Clicks the hidden file input
  };

  const handleFileChange = (e) => {
    setThumbnail(null);
    // returns an array of files from event --> getting only first file
    let selected = e.target.files[0];

    if (!selected) {
      setThumbnailError("File must be selected.");
      return;
    }

    if (!selected.type.includes("image")) {
      setThumbnailError("File must be an image.");
      return;
    }

    // 10000 bytes
    if (selected.size > 100000) {
      setThumbnailError("File size must be less than 100kb");
      return;
    }

    // resetting thumb nail error if it was set before
    setThumbnailError(null);
    setThumbnail(selected);
    setSelectedFileName(selected ? selected.name : "");
    console.log("Thumbnail updated");
  };

  return (
    <div className="auth-form-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <div className="form-container">
          <div className="form-left">
            <label>
              <input
                required
                placeholder="Display Name"
                type="text"
                onChange={(e) => setDisplayName(e.target.value)}
                value={displayName}
              ></input>
            </label>
            <label>
              <input
                required
                placeholder="Email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              ></input>
            </label>
            <label>
              <input
                required
                placeholder="Password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              ></input>
            </label>
          </div>
          <div className="form-right">
            <label>
              <Select
                required
                className="category-select"
                options={categories}
                onChange={(option) => setDepartment(option)}
                // select customize only here - not in css
                theme={(theme) => ({
                  ...theme,
                  borderRadius: "5px",
                  colors: {
                    ...theme.colors,
                    text: "orange",
                    primary25: "orange",
                    primary: "orange",
                  },
                })}
                placeholder="Department"
              />
            </label>
            <label>
              <input
                required
                placeholder="Role"
                type="text"
                onChange={(e) => setRole(e.target.value)}
                value={role}
              ></input>
            </label>
              <label>
              <div className="upload-image-container">
                <button
                  className="btn"
                  type="button"
                  onClick={handleButtonClick}
                >
                  Upload Image
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  style={{ display: "none" }}
                  accept="image/*"
                  onChange={handleFileChange}
                />
                {selectedFileName && <p>{selectedFileName.slice(0, 18)}...</p>}
                </div>
                {thumbnailError && (
                  <div className="error">{thumbnailError}</div>
                )}
              </label>
          </div>
        </div>
        {!isPending && <button className="btn">Submit</button>}
        {isPending && (
          <button className="btn" disabled>
            Loading...
          </button>
        )}
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
}
