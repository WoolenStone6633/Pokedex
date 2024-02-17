import { NavLink, Link, Outlet } from "react-router-dom"

// layout for the pokecards
export default function PokeListLayout() {

    //Reloads entire page
    const reset = () => {
        <App/>
    }

    return (
        <>
            <header>
                <Link to={"All"} className="pokeLink" onClick={reset}>Pokedex</Link>
                <div>
                    <p>Sort by:</p>
                    <NavLink to={"All"}><button className="navSortBut" id="allBut">All</button></NavLink>
                    <NavLink to={"Region"}><button className="navSortBut" id="regBut">Region</button></NavLink>
                    <NavLink to={"Generation"}><button className="navSortBut" id="genBut">Generation</button></NavLink>
                </div>
            </header>
            <main>
                <Outlet/>
            </main>
        </>
    )
}