import React from "react";
import { Link } from "react-router-dom";

export const AlbumCard = ({ albumId, title }) => {

  return (
    <Link
      to={`album/${albumId}`}>
      <div className="flex border rounded p-2 bg-slate-300 space-x-1  border-sky-500">
        <p className="max-w-fit">{albumId}</p>
        <p>{title}</p>
      </div>
    </Link>
  )
}