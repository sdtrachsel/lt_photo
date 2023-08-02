import React from "react";
import { Header } from "../components/Header/Header";
import { Outlet } from "react-router-dom";
import logo from '../assets/logo.png'

export const RootLayout =()=>{
  return(
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  )
}