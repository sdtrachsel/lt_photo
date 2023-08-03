import React from "react";
import { Link } from "react-router-dom";
import { useRouteMatch } from "react-router-dom";

export const PhotoCard = ({photoId, title, thumbnail}) => {
  let match = useRouteMatch();

  return(
    <Link to={`/photo/${photoId}`} >
    <section>
        <img src={thumbnail} alt={title} />
        <div>
          <p>{photoId}</p>
          <p>{title}</p>
        </div>
    </section>
    </Link>
  )
}