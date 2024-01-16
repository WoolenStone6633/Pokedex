import { useState, useEffect } from "react"
import { useLoaderData } from "react-router-dom"
import RegionList from "../Components/RegionList"

export default function Region () {
    const regions = useLoaderData()
    const url = 'https://pokeapi.co/api/v2/region'
    const [region, setRegion] = useState('kanto')
    const [pokedexURL, setPokedexURL] = useState(`https://pokeapi.co/api/v2/pokedex/2`)
    
    useEffect(() => {
        fetch(`${url}/${region}`)
            .then(res => res.json())
            .then(data => loadReg(data))
    }, [region])

    const loadReg = reg => {
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
                setPokedexURL(prevPokedexURL => `${prevPokedexURL}, ${reg.pokedexes[i].url}`)
            }
        }
    }
    
    return (
        <>
            {regions.results.map(region => <button key={region.name} onClick={() => setRegion(region.name)}> {region.name} </button>)}
            <RegionList url={pokedexURL}/>
        </>
    )
}

export const regionLoader = async () => {
    const res = await fetch('https://pokeapi.co/api/v2/region')

    return res.json()
}