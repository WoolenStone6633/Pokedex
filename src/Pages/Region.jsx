import { useState, useEffect } from "react"
import { useLoaderData } from "react-router-dom"
import RegGenList from "../Components/RegGenList"

let globRegion = "kanto"

export default function Region () {
    const regions = useLoaderData().results
    const url = 'https://pokeapi.co/api/v2/region'
    const [region, setRegion] = useState(globRegion)
    const [pokedexURL, setPokedexURL] = useState(null)
    
    useEffect(() => {
        fetch(`${url}/${region}`)
            .then(res => res.json())
            .then(data => getPokedexURL(data))
    }, [region])

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
        <>
            <nav className="regNav">{regions.map(region => 
                <button key={region.name} className={region.name == globRegion ? "activeRegBut" : "regBut"} onClick={() => {globRegion = region.name, setRegion(region.name)}}>
                    {region.name}
                </button>)}
            </nav>
            {pokedexURL && <RegGenList url={pokedexURL} type={'reg'}/>}
        </>
    )
}

export const regionLoader = async () => {
    const res = await fetch('https://pokeapi.co/api/v2/region')

    return res.json()
}