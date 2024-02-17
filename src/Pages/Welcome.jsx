import { NavLink} from "react-router-dom"

export default function Welcome () {
    return (
        <div>
            <p>Welcome Page</p>
            <NavLink to={"All"}><button className="navSortBut" id="allBut">All</button></NavLink>
            <NavLink to={"Region"}><button className="navSortBut" id="regBut">Region</button></NavLink>
            <NavLink to={"Generation"}><button className="navSortBut" id="genBut">Generation</button></NavLink>
        </div>
    )
}