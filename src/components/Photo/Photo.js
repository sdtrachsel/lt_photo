import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Error } from "../Error/Error";
import { getPhoto } from "../../apiCalls";

export const Photo = () => {
  const [photo, setPhoto] = useState([]);
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('');
  let { photoId } = useParams()

  const fetchPhoto = async () => {
    try {
      const data = await getPhoto(photoId)
      setPhoto(data)
      setLoading(false)
    } catch (err) {
      setError(true)
      setErrorMsg(err.message);
    }
  }

  useEffect(() => {
    fetchPhoto()
  }, [])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <Error errorMsg={errorMsg} />
  }

  return (
    <section className="flex flex-col justify-center border border-white">
      <div className="flex">
        <div className="flex justify-center items-center bg-orange  w-1/6">
          <p className="font-raleway font-semibold text-2xl text-purple-300">{photoId}</p>
        </div>
        <div className="flex justify-center items-center w-5/6 h-20 p-2 space-x-1 bg-purple-200 ">
          <p className="font-raleway text-white text-center text-2xl">{photo.title}</p>
        </div>
      </div>
      <img src={photo.url} alt={photo.title} />
    </section>
  )
}