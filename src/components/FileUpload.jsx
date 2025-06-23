import React from "react";

const FileUpload = ({ files, onFileAdd, onReset }) => {
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      onFileAdd(file);
    } else {
      alert("Please select a valid PDF file.");
    }
    e.target.value = null;
  };

  return (
    <div className="bg-white p-5 rounded-xl shadow-md text-center space-y-2">
      {files.length === 0 ? (
        <label className="cursor-pointer text-blue-600 font-semibold">
          📤 Upload first PDF
          <input
            type="file"
            accept=".pdf"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
      ) : (
        <>
          <p className="text-sm text-gray-700">
            Uploaded: {files.map((f) => f.name).join(", ")}
          </p>
          <div className="space-x-2">
            <label className="cursor-pointer text-blue-600 font-semibold">
              ➕ Add another PDF
              <input
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
            <button
              className="text-red-600 font-medium"
              onClick={onReset}
            >
              Reset
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default FileUpload;
