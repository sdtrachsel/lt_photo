export const getAlbums = () => {
  return fetch('https://jsonplaceholder.typicode.com/albums')
    .then((res) => {
      if (!res.ok) {
        throw new Error(res)
      }

      return res.json()
    })
}