import { useState, useRef } from "react";
import { useSignup } from "../../hooks/useSignup";
import { useLogin } from '../../hooks/useLogin'
import { categories } from "../../util/categories";
import Select from "react-select";

// styles
import "./login-signup.css";
 
export default function Signup() {
  const [switchLogin, setSwitchLogin] = useState(true)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailError, setThumbnailError] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState("");
  const [department, setDepartment] = useState("");
  const [role, setRole] = useState("");
  const { signup, isPendingSignup, errorSignup } = useSignup();
  const { login, isPendingLogin, errorLogin } = useLogin();
  const fileInputRef = useRef(null);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    signup(email, password, displayName, thumbnail, department, role);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  }

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
      {switchLogin ? 
        (
          <form className="auth-form" onSubmit={handleSignupSubmit}>
            <h2>Sign Up</h2>
            <div className="form-container">
              <div className="form-left">
                <label>
                  <input
                    className="input-control"
                    placeholder="Display Name"
                    type="text"
                    required
                    onChange={(e) => setDisplayName(e.target.value)}
                    value={displayName}
                  ></input>
                </label>
                <label>
                  <input
                    className="input-control"
                    placeholder="Email"
                    type="email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  ></input>
                </label>
                <label>
                  <input
                    className="input-control"
                    placeholder="Password"
                    type="password"
                    required
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
                    style={{ width: '100%' }}                  
                    />
                </label>
                <label>
                  <input
                    className="input-control"
                    placeholder="Role"
                    type="text"
                    required
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
                      className="input-control"
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
            <div className="get-started-container">
              {!isPendingSignup && <button className="btn">Get Started</button>}
              {isPendingSignup && (
                <button className="btn" disabled>
                  Loading...
                </button>
              )}
            </div>
            <div className="signin-option">
              <h4>Already a member?</h4>
              <h4 className="switch-login" onClick={() => setSwitchLogin(!switchLogin)}>
                Sign In
              </h4>
            </div>
            {errorSignup && <div className="error">{errorSignup}</div>}
          </form>
        )
        :
        (
          <form className="auth-form" onSubmit={handleLoginSubmit}>
            <h2>Welcome Back!</h2>
            <div className="login-inputs"> 
            <label htmlFor="email" className="input-label">
              <input
                className="input-control" 
                placeholder="Email"
                type="email"
                required
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              ></input>
            </label>
            <label htmlFor="password" className="input-label">
              <input
                className="input-control" 
                placeholder="Password"
                type="password"
                required
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              ></input>
            </label>
            </div>
            <div className="get-started-container">
              {!isPendingLogin && <button type="submit" className="btn">Get Started</button>}
              {isPendingLogin && <button className="btn" disabled>Loading...</button>}
            </div>
            <div className="signin-option">
              <h4>Not a member?</h4>
              <h4 className="switch-login" onClick={() => setSwitchLogin(!switchLogin)}>
                Sign Up
              </h4>
            </div>
            {errorLogin && <div className="error">{errorLogin}</div>}
          </form>
        )
      }
    </div>
  );
}
