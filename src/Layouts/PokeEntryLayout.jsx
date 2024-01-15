import { Outlet } from "react-router-dom"

export default function PokeEntryLayout() {
    return (
        <>
            <header className="entryHeader">Entry Stuff</header>
            <main>
                <Outlet/>
            </main>
        </>
    )
}