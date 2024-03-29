import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom"

// Pages
import Home from "./Pages/Home"
import Region, {regionLoader} from "./Pages/Region"
import Generation, {generationLoader} from "./Pages/Generation"
import PokeEntry, { pokeLoader} from "./Pages/PokeEntry"

// Layouts
import MainLayout from "./Layouts/MainLayout"
import PokeListLayout from "./Layouts/PokeListLayout"
import PokeEntryLayout from "./Layouts/PokeEntryLayout"

const router = createBrowserRouter (
  createRoutesFromElements (
    <Route>
      <Route path="Pokedex" element={<MainLayout/>}>
        <Route element={<PokeListLayout/>}>
          <Route path="All" element={<Home/>}/>
          <Route path="Region" element={<Region/>} loader={regionLoader}/>
          <Route path="Generation" element={<Generation/>} loader={generationLoader}/>
        </Route>
      
        <Route path="PokeEntry" element={<PokeEntryLayout/>}>
          <Route path=":pokemon" element={<PokeEntry/>} loader={pokeLoader}/>
        </Route>
      </Route>
    </Route>
  )
)

export default function App() {
  return (
    <RouterProvider router={router} />
  )
}