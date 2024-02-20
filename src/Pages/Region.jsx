import { useState, useEffect } from "react"
import { useLoaderData } from "react-router-dom"
import RegGenList from "../Components/RegGenList"

let globRegion = "kanto"

// handles the region information along with the region nav
export default function Region () {
    const regions = useLoaderData().results
    const url = 'https://pokeapi.co/api/v2/region'
    const [region, setRegion] = useState(globRegion)
    const [pokedexURL, setPokedexURL] = useState(null)
    
    // gets the data of a specified region and passes it to a function
    useEffect(() => {
        fetch(`${url}/${region}`)
            .then(res => res.json())
            .then(data => getPokedexURL(data))
    }, [region])

    // gets the url for the specifies pokedex region
    const getPokedexURL = reg => {
        setPokedexURL("")
        for (let i = 0; i < reg.pokedexes.length; i++) {
            if (reg.pokedexes[i].name == reg.name && reg.name != "hoenn" ) {
                setPokedexURL(reg.pokedexes[i].url)
                break
            } else if (reg.pokedexes[i].name.includes("updated") && reg.pokedexes[i].name.includes(reg.name) && reg.name != "sinnoh") {
                setPokedexURL(reg.pokedexes[i].url)
                break
            } else if (reg.pokedexes[i].name.includes("extended")) {
                setPokedexURL(reg.pokedexes[i].url)
                break
            } else if (reg.pokedexes[i].name.includes("kalos")) {
                setPokedexURL(prevPokedexURL => `${prevPokedexURL},${reg.pokedexes[i].url}`)
            }
        }
    }
    
    return (
        <div className="reg-gen-wrapper">
            <nav className="reg-gen-nav">
                <ul class='nav-list'>
                    <li className="nav-title">Regions: </li>
                    {regions.map(region => 
                    <li key={region.name} className={region.name == globRegion && "activeNav"} onClick={() => {globRegion = region.name, setRegion(region.name)}}>
                        {region.name}
                    </li>)}
                </ul>
            </nav>
            {pokedexURL && <RegGenList url={pokedexURL} type={'reg'}/>}
        </div>
    )
}

export const regionLoader = async () => {
    const res = await fetch('https://pokeapi.co/api/v2/region')

    return res.json()
}