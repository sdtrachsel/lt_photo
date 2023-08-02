import React from "react";

export const AlbumCard =({albumId, title})=>{

  return(
    <div>
      <p>{albumId}</p>
      <p>{title}</p>
    </div>
  )
}