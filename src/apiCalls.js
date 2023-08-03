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
      console.log(res)
      if (!res.ok) {
        throw new Error(res)
      }
      return res.json()
    })
    .then((data) => {
      if (!data || data.length === 0) {
        throw new Error("No data returned from API");
      }
      return data;
    });
}

export const getPhoto =(id)=>{
  return fetch(`https://jsonplaceholder.typicode.com/photos/${id}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error(res)
      }
      return res.json()
    })
}