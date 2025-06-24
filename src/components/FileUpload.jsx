import React, { useRef } from "react";

function FileUpload({ files, onFileAdd, onReset }) {
  const inputRef = useRef();

  const handleFileChange = (e) => {
    const selected = Array.from(e.target.files).filter((f) =>
      f.name.toLowerCase().endsWith(".pdf")
    );

    if (selected.length === 0) {
      alert("Please select at least one valid PDF file.");
      return;
    }

    for (let file of selected) {
      onFileAdd(file);
    }

    // Reset input
    e.target.value = null;
  };

  return (
    <div className="space-y-4 text-center">
      <label
        htmlFor="fileInput"
        className="cursor-pointer block p-6 bg-white border border-dashed border-gray-300 rounded-xl shadow hover:bg-gray-50"
      >
        <p className="text-gray-600">📁 Click to upload PDF(s)</p>
        <p className="text-xs text-gray-400">(multiple files supported)</p>
      </label>
      <input
        type="file"
        id="fileInput"
        accept=".pdf"
        multiple
        className="hidden"
        ref={inputRef}
        onChange={handleFileChange}
      />

      {files.length > 0 && (
        <div className="text-left bg-gray-50 rounded-lg p-3 shadow-inner border text-sm text-gray-700">
          <p className="font-semibold mb-2">Selected Files:</p>
          <ul className="list-disc pl-5 space-y-1">
            {files.map((file, i) => (
              <li key={i}>{file.name}</li>
            ))}
          </ul>
          <button
            onClick={onReset}
            className="mt-2 text-xs text-red-500 underline hover:text-red-600"
          >
            Reset files
          </button>
        </div>
      )}
    </div>
  );
}

export default FileUpload;
