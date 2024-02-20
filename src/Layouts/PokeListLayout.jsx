import { NavLink, Link, Outlet } from "react-router-dom"
import SearchBar from "../Components/SearchBar"

// layout for the pokecards
export default function PokeListLayout() {

    //Reloads entire page
    const reset = () => {
        <App/>
    }

    return (
        <>
            <header>
                <Link to={"/Pokedex"} className="pokeLink" onClick={reset}>Pokedex</Link>
                <SearchBar/>
                <nav>
                    <p>Sort by:</p>
                    <NavLink to={"All"}><button className="navSortBut" id="allBut">All</button></NavLink>
                    <NavLink to={"Region"}><button className="navSortBut" id="regBut">Region</button></NavLink>
                    <NavLink to={"Generation"}><button className="navSortBut" id="genBut">Generation</button></NavLink>
                </nav>
            </header>
            <main>
                <Outlet/>
            </main>
        </>
    )
}