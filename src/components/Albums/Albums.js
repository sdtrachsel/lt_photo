import React, { useEffect, useState } from "react";
import { getAlbums } from "../../apiCalls";
import { AlbumCard } from "../AlbumCard/AlbumCard";
import { Loader } from "../Loader/Loader";
import { Error } from "../Error/Error";

export const Albums = () => {
  const [albums, setAlbums] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const albumCards = () => {
    if (isLoading) {
      return <Loader />
    }
    const filteredAlbums = albums.filter(album => {
      return album.title.toLowerCase().includes(searchValue.toLowerCase()) || album.id.toString().includes(searchValue);
    });

    const cards = filteredAlbums.map(album => {
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

  if (error) {
    return <Error />
  }

  return (
    <div>
      <section className="flex p-4">
        <label data-cy="search-label" htmlFor="search" className="font-raleway font-semibold text-2xl text-orange pr-2">Search:</label>
        <input
          data-cy="search-bar"
          id="search"
          type="search"
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
          placeholder="Search by Album Title or ID"
          className="w-full h-8 p-2 rounded-lg"
        />
      </section>
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-auto gap-4">
        {albumCards()}
      </section>
    </div>
  )
}