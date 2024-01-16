import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom"

// Pages
import Home from "./Pages/Home"
import Region, {regionLoader} from "./Pages/Region"
import Generation from "./Pages/Generation"
import PokeEntry, { pokeLoader} from "./Pages/PokeEntry"

// Layouts
import MainLayout from "./Layouts/MainLayout"
import PokeListLayout from "./Layouts/PokeListLayout"
import PokeEntryLayout from "./Layouts/PokeEntryLayout"

const router = createBrowserRouter (
  createRoutesFromElements (
    <Route path="/" element={<MainLayout/>}>
      <Route element={<PokeListLayout/>}>
        <Route index element={<Home/>}/>
        <Route path="region" element={<Region/>} loader={regionLoader}/>
        <Route path="generation" element={<Generation/>}/>
      </Route>
    
      <Route path="pokeEntry" element={<PokeEntryLayout/>}>
        <Route path=":pokemon" element={<PokeEntry/>} loader={pokeLoader}/>
      </Route>
    </Route>
  )
)

export default function App() {
  return (
    <RouterProvider router={router} />
  )
}