import { Link, Outlet } from "react-router-dom"

export default function HomeLayout() {
    let showing = false
    let curPoke = "allBut"
    
    const sortClicked = () => {
        !showing ? (
            curPoke != "allBut" && (document.getElementById("allBut").hidden = false),
            curPoke != "regBut" && (document.getElementById("regBut").hidden = false),
            curPoke != "genBut" && (document.getElementById("genBut").hidden = false)
        ) : (
            document.getElementById("allBut").hidden = true,
            document.getElementById("regBut").hidden = true,
            document.getElementById("genBut").hidden = true
        )
        showing = !showing
    }

    const sortByClicked = e => {
        document.getElementById(curPoke).hidden = false
        curPoke = e.target.id
        document.getElementById(curPoke).hidden = true
    }

    return (
        <>
            <header className="homeHeader">
                <p>Pokedex</p>
                <button className="sortButton" onClick={sortClicked}>Sort by</button> {/* All, Region, Generation */}
                <Link to={"/"}><button className="navSortBut" id="allBut" onClick={sortByClicked} hidden>All</button></Link>
                <Link to={"region"}><button className="navSortBut" id="regBut" onClick={sortByClicked} hidden>Region</button></Link>
                <Link to={"generation"}><button className="navSortBut" id="genBut" onClick={sortByClicked} hidden>Generation</button></Link>
            </header>
            <main>
                <Outlet/>
            </main>
        </>
    )
}