import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/Firebase";
import { useNavigate } from "react-router-dom";

export default function CompanyReg() {
  const firebase = useFirebase();
  const navigate = useNavigate();

  const [companyName, setCompanyName] = useState("");
  const [companyType, setCompanyType] = useState("");
  const [purpose, setPurpose] = useState("");
  const [paidCapital, setPaidCapital] = useState("");
  const [authorizedCapital, setAuthorizedCapital] = useState("");
  const [nameReservedInROC, setNameReservedInROC] = useState(false);
  const [registeredAddress, setRegisteredAddress] = useState("");
  const [gstNumberAddressProof, setGstNumberAddressProof] = useState(null);

  useEffect(() => {
    if (!firebase.isLoggedIn) {
      navigate("/login");
    }
  }, [firebase, navigate]);

  const handleSubmitStep1 = async (e) => {
    e.preventDefault();
    await firebase.handleCreateNewListingStep1(
      companyName,
      companyType,
      purpose,
      paidCapital,
      authorizedCapital,
      nameReservedInROC,
      registeredAddress,
      gstNumberAddressProof
    );
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmitStep1} className="form-list">
        <div className="mb-3">
          <label className="form-label">Name of Proprietor or Company</label>
          <input
            type="text"
            placeholder="Enter Company Name"
            className="form-control"
            onChange={(e) => setCompanyName(e.target.value)}
            value={companyName}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Company Type</label>
          <input
            type="text"
            placeholder="Enter Company Type"
            className="form-control"
            onChange={(e) => setCompanyType(e.target.value)}
            value={companyType}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Purpose</label>
          <textarea
            placeholder="Enter Purpose"
            className="form-control"
            onChange={(e) => setPurpose(e.target.value)}
            value={purpose}
            rows="4"
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Paid Capital</label>
          <input
            type="text"
            placeholder="Enter Paid Capital"
            className="form-control"
            onChange={(e) => setPaidCapital(e.target.value)}
            value={paidCapital}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Authorized Capital</label>
          <input
            type="text"
            placeholder="Enter Authorized Capital"
            className="form-control"
            onChange={(e) => setAuthorizedCapital(e.target.value)}
            value={authorizedCapital}
          />
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="nameReservedInROC"
            checked={nameReservedInROC}
            onChange={(e) => setNameReservedInROC(e.target.checked)}
          />
          <label className="form-check-label" htmlFor="nameReservedInROC">
            Reserved Your Name in ROC Form
          </label>
        </div>
        <div className="mb-3">
          <label className="form-label">Registered Address</label>
          <input
            type="text"
            placeholder="Enter Registered Address"
            className="form-control"
            onChange={(e) => setRegisteredAddress(e.target.value)}
            value={registeredAddress}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">GST Number Address Proof</label>
          <input
            type="file"
            className="form-control"
            onChange={(e) => setGstNumberAddressProof(e.target.files[0])}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Save Details
        </button>
      </form>
    </div>
  );
}
