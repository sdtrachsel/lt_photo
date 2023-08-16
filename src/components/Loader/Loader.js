import React from "react";

export const Loader =()=>{
  return(
    <section className="animate-pulse min-h-full p-11">
      <p data-cy="loader" className="text-orange text-2xl ">Loading ...</p>
    </section>
  )
}