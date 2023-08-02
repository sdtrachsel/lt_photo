import React from "react"
import logo from '../../assets/logo.png'
import { Link } from "react-router-dom"

export const Header = () => {
  return (
    <header >
      <Link to='/'>
        <img className="w-[75px] cursor-pointer" src={logo} alt="logo" />
      </Link>
    </header>
  )
}