import React, { useEffect, useState } from "react";
import { getAlbums } from "../../apiCalls";
import { AlbumCard } from "../AlbumCard/AlbumCard";
import { Error } from "../Error/Error";

export const Albums = () => {
  const [albums, setAlbums] = useState([]);
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const albumCards = () => {
    if (isLoading) {
      return <div>Loading...</div>
    }
    const cards = albums.map(album => {
      return <AlbumCard key={album.id} albumId={album.id} title={album.title} />
    })
    return cards
  }

  const fetchAlbums = async () => {
    try {
      const data = await getAlbums()
      setAlbums(data)
      setLoading(false)
    } catch (err) {
      setError(true)
    }
  }

  useEffect(() => {
    fetchAlbums()
  }, [])

  if(error){
    return <Error />
  }

  return (
    <section className="grid grid-cols-4 auto-rows-auto gap-4">
       {albumCards()}
    </section>
  )
}

