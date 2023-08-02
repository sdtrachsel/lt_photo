import { Route, Switch } from "react-router-dom";
import { Header } from "../Header/Header";
import { Album } from "../Album/Album";
import { Albums } from "../Albums/Albums";
import { useEffect, useState } from "react";


function App() {
  const [albums, setAlbums] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState(null);

  return (
    <main>
      <Header />
      <Switch >
        <Route exact path="/" render={() =>
          <Albums
            albums={albums}
            setAlbums={setAlbums}
            setSelectedAlbum={setSelectedAlbum}
          />} />
        <Route path="/album" render={() => <Album />} />
      </Switch>
    </main>
  );
}

export default App;