import { useState, useRef } from "react";
import { useSignup } from "../../hooks/useSignup";
import { useLogin } from "../../hooks/useLogin";
import { categories } from "../../util/categories";
import Select from "react-select";

// styles
import "./login-signup.css";

export default function SignupLogin() {
  const [switchLogin, setSwitchLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailError, setThumbnailError] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState("");
  const [department, setDepartment] = useState("");
  const [role, setRole] = useState("");
  const { signup, isPendingSignup, error: signupError } = useSignup();
  const { login, isPendingLogin, error: loginError } = useLogin();
  const fileInputRef = useRef(null);
  const [errorSignup, setErrorSignup] = useState(null);


  const handleSignupSubmit = async (e) => {
    e.preventDefault();
  
    // Call signup function
    await signup(email, password, displayName, thumbnail, department, role);
  
    // Check for errors after signup
    if (signupError) {
      setErrorSignup(signupError);
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    login(email, password);
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

  const handleSwitchFromSignIn = () => {
    setSwitchLogin(!switchLogin)
    setErrorSignup(null);
  }


  console.log(errorSignup)


  return (
    <div className="auth-form-container">
      {switchLogin ? (
        <form className="auth-form" onSubmit={handleSignupSubmit}>
          <div className="home-text">
            <h2>Welcome to</h2>
          </div>
          <div className="home-text">
            <h1>ProManagement</h1>
          </div>
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
                  style={{ width: "100%" }}
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
                  {selectedFileName && (
                    <p>{selectedFileName.slice(0, 18)}...</p>
                  )}
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
            <h4>Have an account?</h4>
            <h4
              className="switch-login"
              onClick={handleSwitchFromSignIn}
            >
              Sign In
            </h4>
          </div>
          {errorSignup === 'Password error' ? 
              ( <>
                  <div className="error-container">
                    <p>Password must include:</p>
                    <li>8 characters minimum</li>
                    <li>Contain at least one capital letter</li>
                    <li>At least one number</li>
                  </div>
                </>
              ):(
                <></>
              )
          }
          {errorSignup === 'Choose image' ?                  
               <div className="error-container">
                    <p>Must select image.</p>
               </div>
              :
                <></>
          }
        </form>
      ) : (
        <form className="auth-form" onSubmit={handleLoginSubmit}>
          <div className="home-text">
            <h1>Welcome Back!</h1>
          </div>
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
            {!isPendingLogin && (
              <button type="submit" className="btn">
                Get Started
              </button>
            )}
            {isPendingLogin && (
              <button className="btn" disabled>
                Loading...
              </button>
            )}
          </div>
          <div className="signin-option">
            <h4>Don't have an account?</h4>
            <h4
              className="switch-login"
              onClick={() => setSwitchLogin(!switchLogin)}
              >
              Sign Up
            </h4>
          </div>
          <div className="error-container">
          {loginError && <div className="error">{loginError}</div>}
          </div>
        </form>
      )}
    </div>
  );
}
