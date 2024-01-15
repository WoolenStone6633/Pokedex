import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom"

// Pages
import Home from "./Pages/Home"
import PokeEntry, { pokeLoader } from "./Pages/PokeEntry"

// Layouts
import MainLayout from "./Layouts/MainLayout"
import HomeLayout from "./Layouts/HomeLayout"
import PokeEntryLayout from "./Layouts/PokeEntryLayout"

const router = createBrowserRouter (
  createRoutesFromElements (
    <Route path="/" element={<MainLayout/>}>
      <Route element={<HomeLayout/>}>
        <Route index element={<Home/>}/>
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