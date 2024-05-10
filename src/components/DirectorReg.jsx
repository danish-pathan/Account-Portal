import React, { useState } from "react";
import { useFirebase } from "../context/Firebase";

const DirectorReg = () => {
  const firebase = useFirebase();
  const [dob, setDob] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [sharePattern, setSharePattern] = useState("");
  const [education, setEducation] = useState("");
  const [dinNumber, setDinNumber] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [panCardNumber, setPanCardNumber] = useState("");
  const [occupation, setOccupation] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission and save data to Firestore
    await firebase.handleDirectorRegistration(
      dob,
      mobileNumber,
      sharePattern,
      education,
      dinNumber,
      gender,
      email,
      panCardNumber,
      occupation
    );
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form-list">
        <div className="mb-3">
          <label className="form-label">Date of Birth</label>
          <input
            type="date"
            className="form-control"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Mobile Number</label>
          <input
            type="text"
            className="form-control"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Share Pattern</label>
          <input
            type="text"
            className="form-control"
            value={sharePattern}
            onChange={(e) => setSharePattern(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Education</label>
          <input
            type="text"
            className="form-control"
            value={education}
            onChange={(e) => setEducation(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">DIN Number</label>
          <input
            type="text"
            className="form-control"
            value={dinNumber}
            onChange={(e) => setDinNumber(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Gender</label>
          <select
            className="form-control"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Email ID</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">PAN Card Number</label>
          <input
            type="text"
            className="form-control"
            value={panCardNumber}
            onChange={(e) => setPanCardNumber(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Occupation</label>
          <input
            type="text"
            className="form-control"
            value={occupation}
            onChange={(e) => setOccupation(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default DirectorReg;
