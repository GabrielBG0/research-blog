import React from "react";

const ResearchNote = ({ title = "Key Insight", children }) => {
  return (
    <div className="my-8 border-l-4 border-blue-500 bg-blue-50 p-4 rounded-r-lg shadow-sm">
      <h3 className="text-blue-900 font-bold text-lg m-0 mb-2">{title}</h3>
      <div className="text-blue-800">{children}</div>
    </div>
  );
};

export default ResearchNote;
