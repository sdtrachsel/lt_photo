import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Error } from "../Error/Error";
import { getPhoto } from "../../apiCalls";

export const Photo =() =>{
  const [photo, setPhoto] = useState([]);
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  let { photoId } = useParams()

  const photoDisplay = () => {
    if (isLoading) {
      return <div>Loading...</div>
    }
    
  }

  const fetchPhoto = async () => {
    try {
      const data = await getPhoto(photoId)
      setPhoto(data)
      setLoading(false)
    } catch (err) {
      setError(true)
    }
  }

  useEffect(() => {
    fetchPhoto()
  }, [])

  if(error){
    return <Error />
  }

  return(
    <section> 
      <h1>{`${photo.id} ${photo.title}`} </h1>
      <img src={photo.url} alt={photo.title} />
    </section>
  )
}