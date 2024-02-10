import { useState, useEffect } from "react"
import PokeCard from "../Components/PokeCard"

const pokeCardHeight = 131
let displayLimit = (Math.floor(window.innerHeight / pokeCardHeight) - 1) * 4
let currentOffset = 0
let currentPage = Math.floor(currentOffset / displayLimit) + 1

export default function Home () {
    const pokedexEnd = 1025 // (pokemon.count - 297) will need to update this value when more pokemon are added
    const POKEBASEURL = 'https://pokeapi.co/api/v2/pokemon-species'
    const [pokemon, setPokemon] = useState(null)
    const [url, setURL] = useState(`${POKEBASEURL}?offset=${currentOffset}&limit=${displayLimit}`)
    const [currentInputPage, setCurrentInputPage] = useState(currentPage)
    const [currentDisLim, setCurrentDisLim] = useState(displayLimit)
    const [lastPage, setLastPage] = useState(Math.ceil(pokedexEnd / displayLimit))
    const [highlighted, setHighlighted] = useState(false)

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
        setCurrentInputPage(calCurrentPage())
        setLastPage(calLastPage())
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
        currentOffset < (pokedexEnd - displayLimit) && (
            currentOffset += displayLimit, 
            setURL(POKEBASEURL + '?offset=' + currentOffset + '&limit=' + displayLimit)
        )
        currentPage = calCurrentPage()
        setCurrentInputPage(currentPage)
    }

    const prevBut = () => {
        currentOffset < displayLimit && currentOffset > 0 ? (
            currentOffset = 0,
            setURL(POKEBASEURL + '?offset=' + currentOffset + '&limit=' + displayLimit)
        ) : (
            currentOffset -= displayLimit,
            setURL(POKEBASEURL + '?offset=' + currentOffset + '&limit=' + displayLimit)
        )
        currentPage = calCurrentPage()
        setCurrentInputPage(currentPage)
    }

    const calCurrentPage = () => {
        return currentOffset == 0 ? 1 
        : ((currentOffset / displayLimit) % 1 != 0) ? Math.ceil(currentOffset / displayLimit) + 1
        : currentOffset / displayLimit + 1
    }

    const calLastPage = () => {
        let offset = currentOffset
        let pages = 0
        while (pokedexEnd > offset) {
            pages++
            offset += displayLimit
        }
        offset = currentOffset
        while (offset > 0) {
            pages++
            offset -= displayLimit
        }
        return pages
    }

    const blurCheck = e => {
        if (e.target.value == '' || (e.target.value != currentPage))
            setCurrentInputPage(currentPage)
    }

    const inputChecker = e => {
        let potentialVal
        highlighted ? (potentialVal = e.key, setHighlighted(false)) : potentialVal = e.target.value * 10 + (e.key * 1)

        {(
            (e.keyCode < 48 || (e.keyCode > 57 && e.keyCode < 96) || e.keyCode > 105) && e.keyCode != 8 
            || potentialVal > lastPage || potentialVal == 0
        )
        && e.preventDefault()}

        e.keyCode == 13 && e.target.value != currentPage ? (currentPage = e.target.value, document.getElementById('currentPageNum').blur(), (pageLoader(e.target.value - 1)))
        : (e.keyCode == 13 && (document.getElementById('currentPageNum').blur(), console.log("same page")))
    }

    const pageLoader = offset => {
        if (offset >= 0 && offset <= lastPage) {
            currentOffset = offset * displayLimit
            setURL(`${POKEBASEURL}?offset=${currentOffset}&limit=${displayLimit}`)
        }
    }

    const getHighText = e => {
        if (e.target.value == window.getSelection().toString()) {
            setHighlighted(true)
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
                    <input id="currentPageNum" type="text" value={currentInputPage} style={{width: `${currentInputPage.toString().length}ch`}} onBlur={blurCheck} onKeyDown={inputChecker} onMouseUp={getHighText} onChange={e => e.target.value <= lastPage ? setCurrentInputPage(e.target.value) : setCurrentInputPage(currentPage)}/>
                    &#8198;out of {lastPage}
                </p>
                <button id="nextBut" onClick={nextBut}>Next</button>
            </div>
        </div>
    )
}