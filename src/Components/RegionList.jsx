import { useState, useEffect } from "react"
import PokeCard from "./PokeCard"

const displayLimit = 20
let start = 0
let end = start + displayLimit
let limit = displayLimit

export default function Region ({url}) {
    const [pokedex, setPokedex] = useState(null)
    const [, render] = useState(null)
    
    useEffect(() => {
        let urlArr = null
        if (url.includes("12" && "13" && "14")) {
            urlArr = url.split(',').splice(1, 3)
        }

        if (urlArr != null) {
            setPokedex(null)
            Promise.all(urlArr.map(url =>
                fetch(url)
                    .then(res => res.json())
                )).then(json => setPokedex([...json[0].pokemon_entries, ...json[1].pokemon_entries, ...json[2].pokemon_entries]))
        } else {
            fetch(url)
                .then(res => res.json())
                .then(data => setPokedex(data.pokemon_entries))
        }
    }, [url])

    const nextBut = () => {
        (start - (pokedex.length - displayLimit * 2)) > 0 && (
            limit = (pokedex.length - displayLimit) - start
        )

        start < (pokedex.length - displayLimit) && (
            start += displayLimit,
            end += limit,
            render(start)
            //setURL(POKEBASEURL + '?offset=' + currentOffset + '&limit=' + limit)
        )
    }

    const prevBut = () => {
        start > 0 && limit == 20 ? (
            start -= displayLimit,
            end -= displayLimit,
            render(start)
            //setURL(POKEBASEURL + '?offset=' + currentOffset + '&limit=' + limit)
        ) 
        : (
            start -= displayLimit, 
            end -= displayLimit,
            limit = displayLimit, 
            render(start)
            //setURL(POKEBASEURL + '?offset=' + currentOffset + '&limit=' + displayLimit)
        )
    }
    
    return (
        <>
            {console.log(start, end)}
            {pokedex ? pokedex.map((poke, index) => {
                return (
                    index >= start && index < end &&
                    <PokeCard key={poke.pokemon_species.name} name={poke.pokemon_species.name} pokeNum={poke.pokemon_species.url.substring(42, poke.pokemon_species.url.length-1) + '.png'}/>
            )}) : null}
            <button className="pageNavBut" id="backBut" onClick={prevBut}>Back</button>
            <button className="pageNavBut" id="nextBut" onClick={nextBut}>Next</button>
        </>
    )
}