import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/Firebase";
import "./uploadStyles.css"; // Import the CSS file

const UploadedDocuments = () => {
  const firebase = useFirebase();
  const [documentUploads, setDocumentUploads] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await firebase.listAllDocumentUploads();
      const uploads = [];
      querySnapshot.forEach((doc) => {
        uploads.push({ id: doc.id, ...doc.data() });
      });
      setDocumentUploads(uploads);
    };

    fetchData();
  }, [firebase]);

  return (
    <div className="uploaded-documents-container">
      <h1>Uploaded Documents</h1>
      {documentUploads.map((upload) => (
        <div className="uploaded-document" key={upload.id}>
          <h2>{upload.displayName}</h2>
          {upload.panCardOrPassportURL && (
            <p>
              <span className="document-link">PAN Card or Passport:</span>{" "}
              <a
                href={upload.panCardOrPassportURL}
                target="_blank"
                rel="noopener noreferrer"
              >
                View
              </a>
            </p>
          )}
          {upload.drivingLicenseURL && (
            <p>
              <span className="document-link">Driving License:</span>{" "}
              <a
                href={upload.drivingLicenseURL}
                target="_blank"
                rel="noopener noreferrer"
              >
                View
              </a>
            </p>
          )}
          {upload.voterIDURL && (
            <p>
              <span className="document-link">Voter ID:</span>{" "}
              <a
                href={upload.voterIDURL}
                target="_blank"
                rel="noopener noreferrer"
              >
                View
              </a>
            </p>
          )}
          {upload.bankStatementURL && (
            <p>
              <span className="document-link">Bank Statement:</span>{" "}
              <a
                href={upload.bankStatementURL}
                target="_blank"
                rel="noopener noreferrer"
              >
                View
              </a>
            </p>
          )}
          {upload.lightBillURL && (
            <p>
              <span className="document-link">Light Bill:</span>{" "}
              <a
                href={upload.lightBillURL}
                target="_blank"
                rel="noopener noreferrer"
              >
                View
              </a>
            </p>
          )}
          {upload.passportPhotoURL && (
            <p>
              <span className="document-link">Passport Photo:</span>{" "}
              <a
                href={upload.passportPhotoURL}
                target="_blank"
                rel="noopener noreferrer"
              >
                View
              </a>
            </p>
          )}
          {upload.directorsSignatureURL && (
            <p>
              <span className="document-link">Director's Signature:</span>{" "}
              <a
                href={upload.directorsSignatureURL}
                target="_blank"
                rel="noopener noreferrer"
              >
                View
              </a>
            </p>
          )}
          {upload.nocURL && (
            <p>
              <span className="document-link">NOC:</span>{" "}
              <a href={upload.nocURL} target="_blank" rel="noopener noreferrer">
                View
              </a>
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default UploadedDocuments;
