import { Outlet, useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"

export default function PokeEntryLayout() {
    const navigate = useNavigate()
    
    return (
        <>
            <header className="entryHeader">
                <button className="retBut" onClick={() => navigate(-1)}>Back</button>
            </header>
            <main>
                <Outlet/>
            </main>
        </>
    )
}