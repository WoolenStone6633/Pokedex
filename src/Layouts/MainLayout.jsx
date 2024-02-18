import { Outlet } from "react-router-dom"
import Welcome from '../Pages/Welcome'

// layout for the overal webpage
export default function MainLayout() {
    return (
        <>
            <Welcome/>
            <Outlet/>
            <footer>
                <p>Powered by&nbsp;
                    <a href="https://pokeapi.co/" target="_blank" rel="noopener noreferrer">PokeAPI</a>
                </p>
            </footer>
        </>
    )
}