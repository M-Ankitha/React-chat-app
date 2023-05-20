import React from "react";
import { Link } from "react-router-dom";
import AnkithaProfilePic from "../images/AnkithaProfilePic.png";

function NavbarComp() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-dark ">
        <Link className="navbar-brand text-white" to="/">
          Chat Room
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse  d-flex flex-row-reverse"
          id="navbarNav"
        >
          <ul className="navbar-nav  ">
            <li className="nav-item ">
              <img
                src={AnkithaProfilePic}
                width="30"
                height="40"
                className="d-inline-block align-top rounded-circle "
                alt=""
              />
              <a className="nav-link  d-inline-block  text-white " href="#">
                Ankitha
              </a>
            </li>
            <li className="nav-item ">
              <a className="nav-link text-white  " href="#">
                logout
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default NavbarComp;