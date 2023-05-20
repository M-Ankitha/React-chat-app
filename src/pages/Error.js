import React from "react";
import NavbarComp from "../components/Navbar";

export default function Error() {
  return (
    <div>
      {/**top navbar */}
      <NavbarComp />

      <div className="text-center text-muted ">
        <h1 className=" mt-5 ">404 Error !!</h1>
        <p>Page not found</p>
      </div>
    </div>
  );
}
