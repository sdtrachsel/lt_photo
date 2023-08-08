import React from "react";
import logo from '../../assets/logo.png';
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header >
      <Link to='/' className="inline-block">
        <img className="w-fit cursor-pointer" src={logo} alt="logo" />
      </Link>
    </header>
  )
}