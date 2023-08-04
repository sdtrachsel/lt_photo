import React from "react";
import { Link } from "react-router-dom";

export const AlbumCard = ({ albumId, title }) => {

  return (
    <Link
      to={`album/${albumId}`}>
      <div className="flex min-h-32 w-full border hover:border-y-2 rounded-lg">
        <div className="flex justify-center items-center bg-orange rounded-l-lg w-1/6">
          <p className="font-raleway font-semibold text-lg text-purple-300">{albumId}</p>
        </div>
        <div className="flex justify-center items-center w-5/6 h-20 p-2 space-x-1 rounded-r-lg bg-purple-200 ">
          <p className="font-raleway text-white text-center">{title}</p>
        </div>
      </div>
    </Link>
  )
}