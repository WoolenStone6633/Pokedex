import { useState, useEffect } from "react"
import PokeCard from "../Components/PokeCard"

const displayLimit = 20
let currentOffset = 0
let limit = displayLimit

export default function Home () {
    const pokedexEnd = 1025 // (pokemon.count - 297) will need to update this value when more pokemon are added
    const POKEBASEURL = 'https://pokeapi.co/api/v2/pokemon'
    const POKEIMGURL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'
    const [pokemon, setPokemon] = useState(null)
    const [url, setURL] = useState(`${POKEBASEURL}?offset=${currentOffset}&limit=${limit}`)

    useEffect(() => {
        // checks to see if the next or back button needs to be displayed
        currentOffset <= 0 ? document.getElementById("backBut").style.visibility = "hidden"
        : document.getElementById("backBut").style.visibility = "visible"
        
        currentOffset >= pokedexEnd - displayLimit ? document.getElementById("nextBut").style.visibility = "hidden"
        : document.getElementById("nextBut").style.visibility = "visible"
        
        fetch(url)
            .then(res => res.json())
            .then(data => setPokemon(data))
    }, [url])

    const nextBut = () => {
        (currentOffset - (pokedexEnd - displayLimit * 2)) > 0 && (
            limit = (pokedexEnd - displayLimit) - currentOffset
        )

        currentOffset < (pokedexEnd - displayLimit) && (
            currentOffset += displayLimit, 
            setURL(POKEBASEURL + '?offset=' + currentOffset + '&limit=' + limit)
        )
    }

    const prevBut = () => {
        currentOffset > 0 && limit == 20 ? (
            currentOffset -= displayLimit, 
            setURL(POKEBASEURL + '?offset=' + currentOffset + '&limit=' + limit)
        ) 
        : (
            currentOffset -= displayLimit, 
            limit = displayLimit, 
            setURL(POKEBASEURL + '?offset=' + currentOffset + '&limit=' + displayLimit)
        )
    }
    
    return (
        <>
            {pokemon ? pokemon.results.map(poke => {
            return <PokeCard key={poke.name} name={poke.name} imageURL={POKEIMGURL + poke.url.substring(34, poke.url.length-1) + '.png'}/>
            }) : null}
            <button className="pageNavBut" id="backBut" onClick={prevBut}>Back</button>
            <button className="pageNavBut" id="nextBut" onClick={nextBut}>Next</button>
        </>
    )
}