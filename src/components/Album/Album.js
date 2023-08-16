import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAlbum } from "../../apiCalls";
import { Error } from "../Error/Error";
import { Loader } from "../Loader/Loader";
import { PhotoCard } from "../PhotoCard/PhotoCard";

export const Album = () => {
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('');
  const [photos, setPhotos] = useState([]);
  const [searchValue, setSearchValue] = useState("");

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
      return <Loader />
    }

    const filteredPhotos = photos.filter(photo => {
      return photo.title.toLowerCase().includes(searchValue.toLowerCase()) || photo.id.toString().includes(searchValue);
    })

    const cards = filteredPhotos.map(photo => {
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
    <div>
      <h2 data-cy="album-header" className="p-2 font-raleway font-semibold text-3xl text-orange">Album {albumId}</h2>
      <section className="p-4 flex">
        <label 
          data-cy="search-label" 
          htmlFor="search" 
          className="font-raleway font-semibold text-2xl text-orange pr-2"
          >
            Search:
          </label>
        <input
          data-cy="search-bar"
          id="search"
          type="search"
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
          placeholder="Search by Photo Title or ID"
          className="w-full h-8 p-2 rounded-lg"
        />
      </section>
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-auto gap-4">
        {photoCards()}
      </section>
    </div>
  )
}