import React from "react";
import logo from '../../assets/logo.png';
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header data-cy="hdr" >
      <Link data-cy="hdr-link" to='/' className="inline-block">
        <img data-cy="logo" className="w-9/12 cursor-pointer" src={logo} alt="logo" />
      </Link>
    </header>
  )
}