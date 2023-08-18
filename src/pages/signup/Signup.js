import React, { useState } from "react";
import { useSignup } from '../../hooks/useSignup'

// styles
import "./Signup.css";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailError, setThumbnailError] = useState(null);
  const { signup, isPending, error } = useSignup();


  const handleSubmit = (e) => {
    e.preventDefault();
    signup(email, password, displayName, thumbnail)
  }

  const handleFileChange = (e) => {
    setThumbnail(null);
    // returns an array of files from event --> getting only first file
    let selected = e.target.files[0];

    if (!selected) {
      setThumbnailError("File must be selected.");
      return
    }

    if (!selected.type.includes("image")) {
      setThumbnailError("File must be an image.");
      return
    }

    // 10000 bytes
    if (selected.size > 100000) {
      setThumbnailError("File size must be less than 100kb");
      return
    }

    // resetting thumb nail error if it was set before
    setThumbnailError(null);
    setThumbnail(selected)
    console.log('Thumbnail updated')
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <label>
        <span>Email:</span>
        <input
          required
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        ></input>
      </label>
      <label>
        <span>Password:</span>
        <input
          required
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        ></input>
      </label>
      <label>
        <span>Display name:</span>
        <input
          required
          type="text"
          onChange={(e) => setDisplayName(e.target.value)}
          value={displayName}
        ></input>
      </label>
      <label>
        <span>Profile Image:</span>
        <input 
          required type="file" 
          onChange={handleFileChange}
        ></input>
        {thumbnailError && <div className="error">{thumbnailError}</div>}
      </label>
      {!isPending && <button className="btn">Submit</button>}
      {isPending && <button className="btn" disabled>Loading...</button>}
      {error && <div className="error">{error}</div>}
    </form>
  );
}
