import { NavLink, Outlet } from "react-router-dom"

export default function PokeListLayout() {
    let showing = false
    
    const sortClicked = () => {
        !showing ? (
            document.getElementById("allBut").hidden = false,
            document.getElementById("regBut").hidden = false,
            document.getElementById("genBut").hidden = false
        ) : (
            document.getElementById("allBut").hidden = true,
            document.getElementById("regBut").hidden = true,
            document.getElementById("genBut").hidden = true
        )
        showing = !showing
    }

    return (
        <>
            <header className="homeHeader">
                <p>Pokedex</p>
                <button className="sortButton" onClick={sortClicked}>Sort by</button> {/* All, Region, Generation */}
                <NavLink to={"/"}><button className="navSortBut" id="allBut" onClick={sortClicked} hidden>All</button></NavLink>
                <NavLink to={"region"}><button className="navSortBut" id="regBut" onClick={sortClicked} hidden>Region</button></NavLink>
                <NavLink to={"generation"}><button className="navSortBut" id="genBut" onClick={sortClicked} hidden>Generation</button></NavLink>
            </header>
            <main>
                <Outlet/>
            </main>
        </>
    )
}