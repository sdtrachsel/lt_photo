import { Route, Routes } from "react-router-dom";
import { Header } from "../Header/Header";
import { Album } from "../Album/Album";
import { Albums } from "../Albums/Albums";
import { Photo } from "../Photo/Photo";
import { PageNotFound } from "../PageNotFound/PageNotFound";

function App() {
  return (
    <main className="p-6 bg-purple-400 min-h-screen ">
      <Header />
      <Routes >
        <Route path="/" element={<Albums />} />
        <Route path="photo/:photoId" element={<Photo />} />
        <Route path="album/:albumId" element={<Album />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </main>
  );
}

export default App;