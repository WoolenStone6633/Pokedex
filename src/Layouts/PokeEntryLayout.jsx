import { Outlet, useNavigate } from "react-router-dom"

// layout for the pokemon entries
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