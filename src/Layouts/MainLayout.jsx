import { Outlet } from "react-router-dom"

export default function MainLayout() {
    return (
        <>
            <Outlet/>
            <footer>
                <p className="footer">Powered by <a href="https://pokeapi.co/">PokeAPI</a></p>
            </footer>
        </>
    )
}