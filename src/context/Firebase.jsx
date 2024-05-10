import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const FirebaseContext = createContext(null);

const firebaseConfig = {
  apiKey: "AIzaSyDBvRMSn9UK4IsgUlzbH8gObmwciyxNldA",
  authDomain: "account-portal-8e905.firebaseapp.com",
  projectId: "account-portal-8e905",
  storageBucket: "account-portal-8e905.appspot.com",
  messagingSenderId: "272226539012",
  appId: "1:272226539012:web:1ed0e5dbe2a45328c60751",
};

export const useFirebase = () => useContext(FirebaseContext);

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

const googleProvider = new GoogleAuthProvider();

export const FirebaseProvider = (props) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) setUser(user);
      else setUser(null);
    });
  }, []);

  const signupUserWithEmailAndPassword = (email, password) =>
    createUserWithEmailAndPassword(firebaseAuth, email, password);

  const signinUserWithEmailAndPass = (email, password) =>
    signInWithEmailAndPassword(firebaseAuth, email, password);

  const signinWithGoogle = () => signInWithPopup(firebaseAuth, googleProvider);

  const signOut = () => {
    return firebaseAuth.signOut();
  };

  const handleCreateNewListingStep1 = async (
    companyName,
    companyType,
    purpose,
    paidCapital,
    authorizedCapital,
    nameReservedInROC,
    registeredAddress,
    gstNumberAddressProof
  ) => {
    // Upload GST Number Address Proof
    const proofRef = ref(
      storage,
      `uploads/documents/${Date.now()}-${gstNumberAddressProof.name}`
    );
    const proofUploadResult = await uploadBytes(
      proofRef,
      gstNumberAddressProof
    );
    const proofDownloadURL = await getDownloadURL(proofUploadResult.ref);

    // Add company registration data to Firestore
    const docRef = await addDoc(collection(firestore, "companyRegistrations"), {
      companyName,
      companyType,
      purpose,
      paidCapital,
      authorizedCapital,
      nameReservedInROC,
      registeredAddress,
      gstNumberAddressProof: proofDownloadURL,
      userID: user.uid,
      userEmail: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    });
  };

  const handleDirectorRegistration = async (
    dob,
    mobileNumber,
    sharePattern,
    education,
    dinNumber,
    gender,
    email,
    panCardNumber,
    occupation
  ) => {
    const docRef = await addDoc(collection(firestore, "directors"), {
      dob,
      mobileNumber,
      sharePattern,
      education,
      dinNumber,
      gender,
      email,
      panCardNumber,
      occupation,
      userID: user.uid,
      userEmail: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    });
  };

  const handleDocumentUpload = async (
    panCardOrPassport,
    drivingLicense,
    voterID,
    bankStatement,
    lightBill,
    passportPhoto,
    directorsSignature,
    noc
  ) => {
    // Upload documents to Firebase Storage
    const uploadPromises = [];

    if (panCardOrPassport) {
      const panCardOrPassportRef = ref(
        storage,
        `uploads/documents/${Date.now()}-${panCardOrPassport.name}`
      );
      uploadPromises.push(
        uploadBytes(panCardOrPassportRef, panCardOrPassport).then((snapshot) =>
          getDownloadURL(snapshot.ref)
        )
      );
    }

    if (drivingLicense) {
      const drivingLicenseRef = ref(
        storage,
        `uploads/documents/${Date.now()}-${drivingLicense.name}`
      );
      uploadPromises.push(
        uploadBytes(drivingLicenseRef, drivingLicense).then((snapshot) =>
          getDownloadURL(snapshot.ref)
        )
      );
    }

    if (voterID) {
      const voterIDRef = ref(
        storage,
        `uploads/documents/${Date.now()}-${voterID.name}`
      );
      uploadPromises.push(
        uploadBytes(voterIDRef, voterID).then((snapshot) =>
          getDownloadURL(snapshot.ref)
        )
      );
    }

    if (bankStatement) {
      const bankStatementRef = ref(
        storage,
        `uploads/documents/${Date.now()}-${bankStatement.name}`
      );
      uploadPromises.push(
        uploadBytes(bankStatementRef, bankStatement).then((snapshot) =>
          getDownloadURL(snapshot.ref)
        )
      );
    }

    if (lightBill) {
      const lightBillRef = ref(
        storage,
        `uploads/documents/${Date.now()}-${lightBill.name}`
      );
      uploadPromises.push(
        uploadBytes(lightBillRef, lightBill).then((snapshot) =>
          getDownloadURL(snapshot.ref)
        )
      );
    }

    if (passportPhoto) {
      const passportPhotoRef = ref(
        storage,
        `uploads/documents/${Date.now()}-${passportPhoto.name}`
      );
      uploadPromises.push(
        uploadBytes(passportPhotoRef, passportPhoto).then((snapshot) =>
          getDownloadURL(snapshot.ref)
        )
      );
    }

    if (directorsSignature) {
      const directorsSignatureRef = ref(
        storage,
        `uploads/documents/${Date.now()}-${directorsSignature.name}`
      );
      uploadPromises.push(
        uploadBytes(directorsSignatureRef, directorsSignature).then(
          (snapshot) => getDownloadURL(snapshot.ref)
        )
      );
    }

    if (noc) {
      const nocRef = ref(
        storage,
        `uploads/documents/${Date.now()}-${noc.name}`
      );
      uploadPromises.push(
        uploadBytes(nocRef, noc).then((snapshot) =>
          getDownloadURL(snapshot.ref)
        )
      );
    }

    const uploadResults = await Promise.all(uploadPromises);

    // Save document URLs to Firestore
    const docRef = await addDoc(collection(firestore, "documentUploads"), {
      panCardOrPassportURL: uploadResults[0] || null,
      drivingLicenseURL: uploadResults[1] || null,
      voterIDURL: uploadResults[2] || null,
      bankStatementURL: uploadResults[3] || null,
      lightBillURL: uploadResults[4] || null,
      passportPhotoURL: uploadResults[5] || null,
      directorsSignatureURL: uploadResults[6] || null,
      nocURL: uploadResults[7] || null,
      userID: user.uid,
      userEmail: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    });
  };

  const listAllProducts = () => {
    return getDocs(collection(firestore, "products"));
  };

  const getProductById = async (id) => {
    const docRef = doc(firestore, "products", id);
    const result = await getDoc(docRef);
    return result;
  };

  const getImageURL = (path) => {
    return getDownloadURL(ref(storage, path));
  };

  const isLoggedIn = user ? true : false;

  const listAllCompanyRegistrations = async () => {
    const querySnapshot = await getDocs(
      collection(firestore, "companyRegistrations")
    );
    return querySnapshot;
  };

  const listAllDirectorRegistrations = async () => {
    const querySnapshot = await getDocs(collection(firestore, "directors"));
    return querySnapshot;
  };

  const listAllDocumentUploads = async () => {
    const querySnapshot = await getDocs(
      collection(firestore, "documentUploads")
    );
    return querySnapshot;
  };

  return (
    <FirebaseContext.Provider
      value={{
        signinWithGoogle,
        signupUserWithEmailAndPassword,
        signinUserWithEmailAndPass,
        handleCreateNewListingStep1,
        listAllProducts,
        getImageURL,
        getProductById,
        isLoggedIn,
        signOut,
        listAllCompanyRegistrations,
        handleDirectorRegistration,
        listAllDirectorRegistrations,
        handleDocumentUpload,
        listAllDocumentUploads,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
