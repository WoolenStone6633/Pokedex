import { Outlet } from "react-router-dom"

export default function HomeLayout() {
    return (
        <>
            <header className="homeHeader">
                <p>Pokedex</p>
                <button>Sort by</button> {/* All, Region, Generation */}
            </header>
            <main>
                <Outlet/>
            </main>
        </>
    )
}