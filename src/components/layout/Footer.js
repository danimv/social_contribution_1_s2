import React from "react";

export default function Footer() {
  return (
    <div>
      <footer
        className="p-3 mt-4 text-center"
        style={{ color: "white", backgroundColor: "#17A2B8" }}
      >
        Copyright &copy; {new Date().getFullYear()} GR8
      </footer>
    </div>
  );
}
