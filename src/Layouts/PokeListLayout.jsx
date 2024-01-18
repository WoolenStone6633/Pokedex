import { NavLink, Link, Outlet } from "react-router-dom"

export default function PokeListLayout() {
    let showing = false

    //Reloads entire page
    const reset = () => {
        <App/>
    }

    return (
        <>
            <header>
                <Link to={"/"} className="pokeLink" onClick={reset}>Pokedex</Link>
                <div>
                    <p>Sort by:</p>
                    <NavLink to={"/"}><button className="navSortBut" id="allBut">All</button></NavLink>
                    <NavLink to={"region"}><button className="navSortBut" id="regBut">Region</button></NavLink>
                    <NavLink to={"generation"}><button className="navSortBut" id="genBut">Generation</button></NavLink>
                </div>
            </header>
            <main>
                <Outlet/>
            </main>
        </>
    )
}