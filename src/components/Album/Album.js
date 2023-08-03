import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { getAlbum } from "../../apiCalls";
import { Error } from "../Error/Error";
import { PhotoCard } from "../PhotoCard/PhotoCard";

export const Album = () => {
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('');
  const [photos, setPhotos] = useState([])
  let { albumId } = useParams()

  const fetchAlbum = async () => {
    try {
      const data = await getAlbum(albumId)
      setPhotos(data)
      setLoading(false)
    } catch (err) {
      setError(true)
      setErrorMsg(err.message);
    }
  }

  const photoCards = () => {
    if (isLoading) {
      return <div>Loading...</div>
    }
    const cards = photos.map(photo => {
      return <PhotoCard
        key={photo.id}
        photoId={photo.id}
        title={photo.title}
        thumbnail={photo.thumbnailUrl}
        url={photo.url}
      />
    })
    return cards
  }

  useEffect(() => {
    fetchAlbum()
  }, [])

  if (error) {
    return <Error errorMsg={errorMsg} />
  }

  return (
    <>
      <h2>Album {albumId} </h2>
      <section className="grid grid-cols-3 auto-rows-auto gap-4">
        {photoCards()}
      </section>
    </>
  )
}