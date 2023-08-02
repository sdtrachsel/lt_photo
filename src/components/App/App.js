import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements
 } from "react-router-dom";

import { Album } from "../Album/Album";
import { Albums } from "../Albums/Albums";
import { RootLayout } from "../../layouts/RootLayout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />} >
      <Route path="/" element={<Albums />} />
      <Route path="album" element={<Album />} />
    </Route>
  )
)

function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;