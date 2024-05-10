import { Routes, Route } from "react-router-dom";
import "./App.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import HomePage from "./pages/Home";
import Details from "./pages/Details";
import CompanyReg from "./components/CompanyReg";
import DirectorReg from "./components/DirectorReg";
import DocumentUpload from "./components/DocumentUpload";
import UploadedDocuments from "./pages/UploadedDocuments";

function App() {
  return (
    <div>
      <Navbar />
      {/* Wrap Routes with CompanyDataProvider */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/product/view/:productId" element={<Details />} />
        <Route path="/companyreg" element={<CompanyReg />} />
        <Route path="/directorreg" element={<DirectorReg />} />
        <Route path="/docupload" element={<DocumentUpload />} />
        <Route path="/viewdocs" element={<UploadedDocuments />} />
      </Routes>
    </div>
  );
}

export default App;
