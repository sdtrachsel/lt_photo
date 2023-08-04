import { Route, Switch } from "react-router-dom";
import { Header } from "../Header/Header";
import { Album } from "../Album/Album";
import { Albums } from "../Albums/Albums";
import { Photo } from "../Photo/Photo";
import { Error } from "../Error/Error";
import { PageNotFound } from "../PageNotFound/PageNotFound";

function App() {
  return (
    <main className="p-6 bg-purple-400 min-h-screen ">
      <Header />
      <Switch >
        <Route exact path="/photo/:photoId" render={()=> <Photo />} />
        <Route exact path="/album/:albumId" render={() => <Album />} />
        <Route exact path="/" render={() =><Albums />} />
        <Route path="*" render={()=> <PageNotFound />} />
      </Switch>
    </main>
  );
}

export default App;