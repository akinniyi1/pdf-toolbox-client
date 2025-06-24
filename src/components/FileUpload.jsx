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
      {files.length === 0 ? (
        <label
          htmlFor="fileInput"
          className="cursor-pointer block p-6 bg-white border border-dashed border-gray-300 rounded-xl shadow hover:bg-gray-50"
        >
          <p className="text-gray-600">📁 Click to upload PDF(s)</p>
          <p className="text-xs text-gray-400">(multiple files supported)</p>
        </label>
      ) : (
        <div className="text-left bg-gray-50 rounded-lg p-3 shadow-inner border text-sm text-gray-700">
          <p className="font-semibold mb-2">Selected Files:</p>
          <ul className="list-disc pl-5 space-y-1">
            {files.map((file, i) => (
              <li key={i}>{file.name}</li>
            ))}
          </ul>
          <div className="mt-3 flex justify-between items-center">
            <label className="cursor-pointer text-blue-600 text-sm">
              ➕ Add more
              <input
                type="file"
                accept=".pdf"
                multiple
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
            <button
              onClick={onReset}
              className="text-red-500 text-xs underline hover:text-red-600"
            >
              Reset files
            </button>
          </div>
        </div>
      )}

      <input
        type="file"
        id="fileInput"
        accept=".pdf"
        multiple
        className="hidden"
        ref={inputRef}
        onChange={handleFileChange}
      />
    </div>
  );
}

export default FileUpload;
