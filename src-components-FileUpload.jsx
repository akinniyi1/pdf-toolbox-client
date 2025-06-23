import React, { useState } from "react";

const FileUpload = ({ onFileSelect }) => {
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setFileName(file.name);
      onFileSelect(file);
    } else {
      alert("Please select a valid PDF file.");
    }
  };

  return (
    <div className="bg-white p-5 rounded-xl shadow-md text-center">
      <label className="cursor-pointer text-blue-600 font-semibold">
        📤 Click to upload PDF
        <input
          type="file"
          accept=".pdf"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>
      {fileName && <p className="mt-2 text-sm text-gray-700">{fileName}</p>}
    </div>
  );
};

export default FileUpload;
