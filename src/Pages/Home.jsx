import { useState, useEffect } from "react"
import PokeCard from "../Components/PokeCard"

const pokeCardHeight = 131
let displayLimit = (Math.floor(window.innerHeight / pokeCardHeight) - 1) * 4
let currentOffset = 0
let limit = displayLimit
let currentPage = Math.floor(currentOffset / displayLimit) + 1

export default function Home () {
    const pokedexEnd = 1025 // (pokemon.count - 297) will need to update this value when more pokemon are added
    const POKEBASEURL = 'https://pokeapi.co/api/v2/pokemon-species'
    const [pokemon, setPokemon] = useState(null)
    const [url, setURL] = useState(`${POKEBASEURL}?offset=${currentOffset}&limit=${limit}`)
    const [currentInputPage, setCurrentInputPage] = useState(currentPage)
    const [currentDisLim, setCurrentDisLim] = useState(displayLimit)
    const lastPage = Math.ceil(pokedexEnd / displayLimit)

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

    useEffect(() => {
        displayLimit = currentDisLim
        setURL(POKEBASEURL + '?offset=' + currentOffset + '&limit=' + displayLimit)
    }, [currentDisLim])

    useEffect(() => {
        function handleResize () {
            const cardLim = (Math.floor(window.innerHeight / pokeCardHeight) - 1) * 4
            cardLim < 4 ? setCurrentDisLim(4) 
            : setCurrentDisLim((Math.floor(window.innerHeight / pokeCardHeight) - 1) * 4)
        }
        window.addEventListener("resize", handleResize)

        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const nextBut = () => {
        (currentOffset - (pokedexEnd - displayLimit * 2)) > 0 && (
            limit = (pokedexEnd - displayLimit) - currentOffset
        )

        currentOffset < (pokedexEnd - displayLimit) && (
            currentOffset += displayLimit, 
            setURL(POKEBASEURL + '?offset=' + currentOffset + '&limit=' + displayLimit)
        )
        setCurrentInputPage(Math.floor(currentOffset / displayLimit) + 1)
    }

    const prevBut = () => {
        currentOffset >= displayLimit && limit == displayLimit ? (
            currentOffset -= displayLimit,
            setURL(POKEBASEURL + '?offset=' + currentOffset + '&limit=' + limit)
        ) : currentOffset < displayLimit && currentOffset > 0 && limit == displayLimit ? (
            currentOffset = 0,
            setURL(POKEBASEURL + '?offset=' + currentOffset + '&limit=' + limit)
        ) : (
            currentOffset -= displayLimit,
            limit = displayLimit,
            setURL(POKEBASEURL + '?offset=' + currentOffset + '&limit=' + displayLimit)
        )
        setCurrentInputPage(Math.floor(currentOffset / displayLimit) + 1)
    }

    const inputChecker = e => {
        const potentialVal = e.target.value * 10 + (e.key * 1)

        {(
            (e.keyCode < 48 || (e.keyCode > 57 && e.keyCode < 96) || e.keyCode > 105) && e.keyCode != 8 
            || potentialVal > 52 || potentialVal == 0
        )
        && e.preventDefault()}

        console.log(potentialVal, currentPage)

        e.keyCode == 13 && e.target.value != currentPage ? (pageLoader(e.target.value - 1), currentPage = e.target.value)
        : (e.keyCode == 13 && console.log("same page (want it to deselect the input and stuff)"))
    }

    const pageLoader = offset => {
        if (offset >= 0 && offset <= lastPage) {
            currentOffset = offset * displayLimit
            setURL(`${POKEBASEURL}?offset=${currentOffset}&limit=${displayLimit}`)
        }
    }
    
    return (
        <div className="card-wrapper">
            <div className="cards">
                {pokemon ? pokemon.results.map(poke => {
                    return <PokeCard key={poke.name} name={poke.name} pokeNum={poke.url.substring(42, poke.url.length-1)}/>
                }) : null}
            </div>
            <div className="pageNav">
                <button id="backBut" onClick={prevBut}>Back</button>
                <p>page&#8198;
                    <input type="text" value={currentInputPage} id="currentPageNum" onKeyDown={inputChecker} onChange={e => setCurrentInputPage(e.target.value)}/>
                    &#8198;out of {lastPage}
                </p>
                <button id="nextBut" onClick={nextBut}>Next</button>
            </div>
        </div>
    )
}