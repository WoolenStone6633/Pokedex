import { useState, useEffect } from "react"
import PokeCard from "./PokeCard"

const displayLimit = 20
let limit = displayLimit
let currentURL
let start
let end
let endDex

export default function Region ({url}) {
    const [pokedex, setPokedex] = useState(null)
    const [, render] = useState(null)
    
    useEffect(() => {
        let urlArr = null

        if (url != currentURL) {
            start = 0
            end = start + displayLimit
            limit = displayLimit
            currentURL = url
        }

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
                        <PokeCard key={poke.pokemon_species.name} name={poke.pokemon_species.name} pokeNum={poke.pokemon_species.url.substring(42, poke.pokemon_species.url.length-1)}/>
                )}) : null}
            </div>
            <button className="pageNavBut" id="backBut" onClick={prevBut}>Back</button>
            <button className="pageNavBut" id="nextBut" onClick={nextBut}>Next</button>
        </>
    )
}