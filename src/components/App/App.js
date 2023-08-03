import { Route, Switch } from "react-router-dom";
import { Header } from "../Header/Header";
import { Album } from "../Album/Album";
import { Albums } from "../Albums/Albums";
import { Photo } from "../Photo/Photo";
import { Error } from "../Error/Error";

function App() {
  return (
    <main>
      <Header />
      <Switch >
        <Route exact path="/photo/:photoId" render={()=> <Photo />} />
        <Route exact path="/album/:albumId" render={() => <Album />} />
        <Route exact path="/" render={() =><Albums />} />
        <Route path="*" render={()=> <Error />} />
      </Switch>
    </main>
  );
}

export default App;