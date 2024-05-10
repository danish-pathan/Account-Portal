// Home.jsx

import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/Firebase";
import "../Home.css"; // Import the CSS file

const Home = () => {
  const firebase = useFirebase();
  const [companyRegistrations, setCompanyRegistrations] = useState([]);
  const [directorRegistrations, setDirectorRegistrations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const companyQuerySnapshot = await firebase.listAllCompanyRegistrations();
      const companyRegistrations = [];
      companyQuerySnapshot.forEach((doc) => {
        companyRegistrations.push({ id: doc.id, ...doc.data() });
      });
      setCompanyRegistrations(companyRegistrations);

      const directorQuerySnapshot =
        await firebase.listAllDirectorRegistrations();
      const directorRegistrations = [];
      directorQuerySnapshot.forEach((doc) => {
        directorRegistrations.push({ id: doc.id, ...doc.data() });
      });
      setDirectorRegistrations(directorRegistrations);
    };

    fetchData();
  }, [firebase]);

  return (
    <div className="home-container">
      <div className="table-container">
        <h1>Company Registrations</h1>
        <table className="registration-table">
          <thead>
            <tr>
              <th>Company Name</th>
              <th>Company Type</th>
              <th>Purpose</th>
              <th>Paid Capital</th>
              <th>Authorized Capital</th>
              <th>Name Reserved in ROC</th>
              <th>Registered Address</th>
              <th>GST Number Address Proof</th>
            </tr>
          </thead>
          <tbody>
            {companyRegistrations.map((registration) => (
              <tr key={registration.id}>
                <td>{registration.companyName}</td>
                <td>{registration.companyType}</td>
                <td>{registration.purpose}</td>
                <td>{registration.paidCapital}</td>
                <td>{registration.authorizedCapital}</td>
                <td>{registration.nameReservedInROC ? "Yes" : "No"}</td>
                <td>{registration.registeredAddress}</td>
                <td>
                  <a
                    href={registration.gstNumberAddressProof}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="table-container">
        <h1>Director Registrations</h1>
        <table className="registration-table">
          <thead>
            <tr>
              <th>Display Name</th>
              <th>Date of Birth</th>
              <th>Mobile Number</th>
              <th>Share Pattern</th>
              <th>Education</th>
              <th>DIN Number</th>
              <th>Gender</th>
              <th>Email ID</th>
              <th>PAN Card Number</th>
              <th>Occupation</th>
            </tr>
          </thead>
          <tbody>
            {directorRegistrations.map((registration) => (
              <tr key={registration.id}>
                <td>{registration.displayName}</td>
                <td>{registration.dob}</td>
                <td>{registration.mobileNumber}</td>
                <td>{registration.sharePattern}</td>
                <td>{registration.education}</td>
                <td>{registration.dinNumber}</td>
                <td>{registration.gender}</td>
                <td>{registration.email}</td>
                <td>{registration.panCardNumber}</td>
                <td>{registration.occupation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
