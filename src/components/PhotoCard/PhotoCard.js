import React from "react";
import { Link } from "react-router-dom";

export const PhotoCard = ({id, title, thumbnail, url }) => {

  return(
    <Link to="">
    <section>
        <img src={thumbnail} alt={title} />
        <div>
          <p>{id}</p>
          <p>{title}</p>
        </div>
    </section>
    </Link>
  )
}