import React from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

export const PhotoCard = ({ photoId, title, thumbnail }) => {
  return (
    <Link to={`/photo/${photoId}`} >
      <section className="p-2 flex flex-col w-full border-2 border-transparent  hover:border-orange rounded-lg bg-purple-300 overflow-hidden">
        
        <div className="flex">
          <div className="flex justify-center items-center bg-orange  w-1/6">
            <p className="font-raleway font-semibold text-lg text-purple-300">{photoId}</p>
          </div>
          <div className="flex justify-center items-center w-5/6 h-20 p-2 space-x-1 bg-purple-200 ">
            <p className="font-raleway text-white text-center">{title}</p>
          </div>
        </div>
        <img src={thumbnail} alt={title} />
      </section>
    </Link>
  )
}

PhotoCard.propTypes = {
  photoId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
};