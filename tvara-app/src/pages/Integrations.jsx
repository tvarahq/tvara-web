import React from "react";
import ExtendedNavbar from "../components/elements/ExtendedNavbar";

function Integrations() {
  return (
    <div className="bg-background text-white min-h-screen">
      <ExtendedNavbar />
      <div className="flex items-center justify-center flex-col space-y-4 h-full mt-20">
        <h1 className="text-7xl font-bold">Integrations</h1>
        <p className="text-4xl mt-4">Coming soon</p>
      </div>
    </div>
  );
}

export default Integrations;
