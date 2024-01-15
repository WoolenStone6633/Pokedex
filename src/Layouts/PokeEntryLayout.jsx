import { Outlet } from "react-router-dom"
import { useLoaderData, Link } from "react-router-dom"

export default function PokeEntryLayout() {
    return (
        <>
            <header className="entryHeader">
                <Link to="/">
                    <button className="retBut">Back</button>
                </Link>
            </header>
            <main>
                <Outlet/>
            </main>
        </>
    )
}