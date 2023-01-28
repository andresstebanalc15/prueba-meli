import React from "react";
import LogoImg from "../../assets/static/Logo.png";
import { Link } from "@reach/router";
export const Logo = () => (
  <div>
    <Link to="/">
      <img src={LogoImg} className="float-end col-3"></img>
    </Link>
  </div>
);
