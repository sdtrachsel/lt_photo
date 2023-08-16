export const getAlbums = () => {
  return fetch('https://jsonplaceholder.typicode.com/albums')
    .then((res) => {
      if (!res.ok) {
        throw new Error(res.message)
      }
      return res.json()
    })
}

export const getAlbum =(id)=>{
  return fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${id}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error(res.message)
      }
      return res.json()
    })
    .then((data) => {
      if (!data || data.length === 0) {
        throw new Error("This album doesn't exist or contains no photos.")
      }
      return data
    });
}

export const getPhoto =(id)=>{
  return fetch(`https://jsonplaceholder.typicode.com/photos/${id}`)
    .then((res) => {
      if(res.status === 404){
        throw new Error(`Not found. This photo doesn't exist.`);
      } else if (!res.ok) {
        throw new Error(res.message);
      }
      return res.json()
    })
}