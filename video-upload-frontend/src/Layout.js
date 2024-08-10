import React from "react";
import Navbar from "./components/navbar";

export default function Layout({ children }) {
  return (
    <div className="flex w-full min-h-screen flex-col gap-4">
      <Navbar />
      <div className="w-full">{children}</div>
    </div>
  );
}
