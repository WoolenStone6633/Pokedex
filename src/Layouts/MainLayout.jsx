import { Outlet } from "react-router-dom"

// layout for the overal webpage
export default function MainLayout() {
    return (
        <>
            <Outlet/>
            <footer>
                <p>Powered by&nbsp;
                    <a href="https://pokeapi.co/" target="_blank" rel="noopener noreferrer">PokeAPI</a>
                </p>
            </footer>
        </>
    )
}