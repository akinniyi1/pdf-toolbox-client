import React, { useState } from "react";

const FileUpload = ({ onFileSelect }) => {
  const [fileNames, setFileNames] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const pdfs = files.filter((file) => file.type === "application/pdf");

    if (pdfs.length === 0) {
      alert("Please select at least one valid PDF file.");
      return;
    }

    setFileNames(pdfs.map((f) => f.name));
    onFileSelect(pdfs); // Send array of files
  };

  return (
    <div className="bg-white p-5 rounded-xl shadow-md text-center">
      <label className="cursor-pointer text-blue-600 font-semibold">
        📤 Click to upload PDFs
        <input
          type="file"
          accept=".pdf"
          multiple
          className="hidden"
          onChange={handleFileChange}
        />
      </label>
      {fileNames.length > 0 && (
        <ul className="mt-2 text-sm text-gray-700">
          {fileNames.map((name, i) => (
            <li key={i}>{name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FileUpload;
