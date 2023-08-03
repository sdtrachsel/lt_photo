export const getAlbums = () => {
  return fetch('https://jsonplaceholder.typicode.com/albums')
    .then((res) => {
      if (!res.ok) {
        throw new Error(res)
      }
      return res.json()
    })
}

export const getAlbum =(id)=>{
  return fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${id}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error(res)
      }
      return res.json()
    })
}