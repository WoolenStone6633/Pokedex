import { useState, useEffect } from "react"
import PokeCard from "./PokeCard"

const displayLimit = 20
let start
let end
let endDex
let limit
let currentURL

export default function GenerationList ({url}) {
    const [pokedex, setPokedex] = useState(null)
    const [, render] = useState(null)

    useEffect(() => {
        if (url != currentURL) {
            start = 0
            end = start + displayLimit
            limit = displayLimit
            currentURL = url
        }

        
        fetch(url)
            .then(res => res.json())
            .then(data => setPokedex(data.pokemon_species.sort(compare)))
    }, [url])

    const compare = (a, b) => {
        return a.url.substring(42, a.url.length - 1) - b.url.substring(42, b.url.length - 1)
    }

    useEffect(() => {
        pokedex ? (
            start <= 0 ? document.getElementById("backBut").style.visibility = "hidden"
            : document.getElementById("backBut").style.visibility = "visible",

            start >= pokedex.length - displayLimit ? document.getElementById("nextBut").style.visibility = "hidden"
            : document.getElementById("nextBut").style.visibility = "visible"
        ) 
        : start == 0 ? document.getElementById("backBut").style.visibility = "hidden"
        : endDex ? document.getElementById("nextBut").style.visibility = "hidden" 
        : null
    }, [start, end])

    const nextBut = () => {
        (start - (pokedex.length - displayLimit * 2)) > 0 && (
            limit = (pokedex.length - displayLimit) - start
        )

        start < (pokedex.length - displayLimit) && (
            start += displayLimit,
            end += limit,
            render(Math.random())
        )
        end == pokedex.length ? endDex = true : endDex = false
    }

    const prevBut = () => {
        start >= displayLimit && limit == displayLimit ? (
            start -= displayLimit,
            end = start + displayLimit,
            render(Math.random())
        ) : start < displayLimit && start > 0 && limit == displayLimit ? (
            start = 0,
            end = displayLimit,
            render(Math.random())
        ) : limit != displayLimit && (
            start -= displayLimit, 
            end = start + displayLimit,
            limit = displayLimit, 
            render(Math.random())
        )
        endDex = false
    }
    
    return (
        <>
            <div>
                {pokedex ? pokedex.map((poke, index) => {
                    return (
                        index >= start && index < end &&
                        <PokeCard key={poke.name} name={poke.name} pokeNum={poke.url.substring(42, poke.url.length - 1)}/>
                )}) : null}
            </div>
            <button className="pageNavBut" id="backBut" onClick={prevBut}>Back</button>
            <button className="pageNavBut" id="nextBut" onClick={nextBut}>Next</button>
        </>
    )
}