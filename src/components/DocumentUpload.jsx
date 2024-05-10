import React, { useState } from "react";
import { useFirebase } from "../context/Firebase";

const DocumentUpload = () => {
  const firebase = useFirebase();
  const [panCardOrPassport, setPanCardOrPassport] = useState(null);
  const [drivingLicense, setDrivingLicense] = useState(null);
  const [voterID, setVoterID] = useState(null);
  const [bankStatement, setBankStatement] = useState(null);
  const [lightBill, setLightBill] = useState(null);
  const [passportPhoto, setPassportPhoto] = useState(null);
  const [directorsSignature, setDirectorsSignature] = useState(null);
  const [noc, setNoc] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission and upload documents to Firebase Storage
    await firebase.handleDocumentUpload(
      panCardOrPassport,
      drivingLicense,
      voterID,
      bankStatement,
      lightBill,
      passportPhoto,
      directorsSignature,
      noc
    );
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form-list">
        <div className="mb-3">
          <label className="form-label">PAN Card or Passport</label>
          <input
            type="file"
            className="form-control"
            onChange={(e) => setPanCardOrPassport(e.target.files[0])}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Driving License</label>
          <input
            type="file"
            className="form-control"
            onChange={(e) => setDrivingLicense(e.target.files[0])}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Voter ID</label>
          <input
            type="file"
            className="form-control"
            onChange={(e) => setVoterID(e.target.files[0])}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Bank Statement</label>
          <input
            type="file"
            className="form-control"
            onChange={(e) => setBankStatement(e.target.files[0])}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Light Bill</label>
          <input
            type="file"
            className="form-control"
            onChange={(e) => setLightBill(e.target.files[0])}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Passport Photo</label>
          <input
            type="file"
            className="form-control"
            onChange={(e) => setPassportPhoto(e.target.files[0])}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Director's Signature</label>
          <input
            type="file"
            className="form-control"
            onChange={(e) => setDirectorsSignature(e.target.files[0])}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">NOC (No Objection Certificate)</label>
          <input
            type="file"
            className="form-control"
            onChange={(e) => setNoc(e.target.files[0])}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Upload Documents
        </button>
      </form>
    </div>
  );
};

export default DocumentUpload;
