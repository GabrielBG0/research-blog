import React from "react";

const ResearchNote = ({ title = "Key Insight", children }) => {
  return (
    <div className="research-note">
      <h3 className="research-note-title">{title}</h3>
      <div className="research-note-body">{children}</div>
    </div>
  );
};

export default ResearchNote;
