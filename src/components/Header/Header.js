import React from "react";
import logo from '../../assets/logo.png';
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header >
      <Link to='/' className="inline-block">
        <img className="w-9/12 cursor-pointer" src={logo} alt="logo" />
      </Link>
    </header>
  )
}