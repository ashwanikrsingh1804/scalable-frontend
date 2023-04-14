import React from "react";

function InvoiceFieldHeader({ children }) {
  return (
    <p
      style={{
        color: "orange",
        fontWeight: "bold",
      }}
    >
      {children}
    </p>
  );
}

export default InvoiceFieldHeader;
