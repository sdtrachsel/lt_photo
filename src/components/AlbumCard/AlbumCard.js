import React from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

export const AlbumCard = ({ albumId, title }) => {

  return (
    <Link data-cy="album-link" to={`album/${albumId}`}>
      <div className="flex min-h-32 w-full border-2 border-transparent  hover:border-orange rounded-lg overflow-hidden">
        <div className="flex justify-center items-center bg-orange  w-1/6">
          <p data-cy="album-id" className="font-raleway font-semibold text-lg text-purple-300">{albumId}</p>
        </div>
        <div className="flex justify-center items-center w-5/6 h-20 p-2 space-x-1 bg-purple-200 ">
          <p data-cy="album-title" className="font-raleway text-white text-center">{title}</p>
        </div>
      </div>
    </Link>
  )
}

AlbumCard.propTypes = {
  albumId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
};