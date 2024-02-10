import { useState, useEffect } from "react"
import PokeCard from "./PokeCard"

const pokeCardHeight = 131
let displayLimit = (Math.floor(window.innerHeight / pokeCardHeight) - 1) * 4
let start
let startStored
let end
let endStored
let endDex
let endDexStored
let currentURL = ''
let currentPage

export default function RegionList ({url, type}) {
    const [pokedex, setPokedex] = useState(null)
    const [pokedexEnd, setPokedexEnd] = useState(null)
    const [currentInputPage, setCurrentInputPage] = useState(start / displayLimit + 1)
    const [currentDisLim, setCurrentDisLim] = useState(displayLimit)
    const [, render] = useState(null)
    const [lastPage, setLastPage] = useState('')
    const [highlighted, setHighlighted] = useState(false)
    
    useEffect(() => {
        let urlArr = null

        // storing the page information when switching between region and generation
        if (url.includes('pokedex') != currentURL.includes('pokedex') || url.includes('generation') != currentURL.includes('generation')) {
            let temp = start
            startStored == undefined ? start = 0 : start = startStored
            startStored = temp
            
            temp = end
            endStored == undefined ? end = start + displayLimit : end = endStored
            endStored = temp

            temp = endDex
            endDexStored == undefined ? endDex = false : endDex = endDexStored
            endDexStored = temp

            currentURL = url
            currentPage = calCurrentPage()
            setCurrentInputPage(currentPage)
        } else if (url != currentURL){
            start = 0
            end = start + displayLimit
            currentURL = url
            currentPage = calCurrentPage()
            setCurrentInputPage(currentPage)
            document.getElementById("backBut").style.visibility = "hidden"
            document.getElementById("nextBut").style.visibility = "visible"
        }

        if (type == 'reg') {
            if (url.includes("12" && "13" && "14")) {
                urlArr = url.split(',').splice(1, 3)
            }

            if (urlArr != null) {
                setPokedex(null)
                Promise.all(urlArr.map(url =>
                    fetch(url)
                        .then(res => res.json())
                    )).then(json => {setPokedex([...json[0].pokemon_entries, ...json[1].pokemon_entries, ...json[2].pokemon_entries]), setPokedexEnd(json[0].pokemon_entries.length + json[1].pokemon_entries.length + json[2].pokemon_entries.length)})
            } else {
                fetch(url)
                    .then(res => res.json())
                    .then(data => {setPokedex(data.pokemon_entries), setPokedexEnd(data.pokemon_entries.length)})
            }
        } else if (type == 'gen') {
            fetch(url)
                .then(res => res.json())
                .then(data => {setPokedex(data.pokemon_species.sort(compare)), setPokedexEnd(data.pokemon_species.length)})
        }
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

    useEffect(() => {
        displayLimit = currentDisLim
        end = start + displayLimit
        render(Math.random())
        setCurrentInputPage(calCurrentPage())
        setLastPage(calLastPage())
    }, [currentDisLim])

    useEffect(() => {
        setLastPage(calLastPage)
    }, [pokedexEnd])

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
        start < (pokedex.length - displayLimit) && (
            start += displayLimit,
            end = start + displayLimit,
            render(Math.random())
        )
        end >= pokedex.length ? endDex = true : endDex = false
        currentPage = calCurrentPage()
        setCurrentInputPage(currentPage)
    }

    const prevBut = () => {
        start >= displayLimit ? (
            start -= displayLimit,
            end = start + displayLimit,
            render(Math.random())
        ) : start < displayLimit && start > 0 ? (
            start = 0,
            end = displayLimit,
            render(Math.random())
        ) : (
            start -= displayLimit, 
            end = start + displayLimit,
            render(Math.random())
        )
        endDex = false
        currentPage = calCurrentPage()
        setCurrentInputPage(currentPage)
    }

    const calCurrentPage = () => {
        return start == 0 ? 1 
        : ((start / displayLimit) % 1 != 0) ? Math.ceil(start / displayLimit) + 1
        : start / displayLimit + 1
    }

    const calLastPage = () => {
        let offset = start
        let pages = 0
        while (pokedexEnd > offset) {
            pages++
            offset += displayLimit
        }
        offset = start
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
            start = offset * displayLimit
            end = start + displayLimit
            render(Math.random())
        }
    }

    const getHighText = e => {
        if (e.target.value == window.getSelection().toString()) {
            setHighlighted(true)
        }
    }
    
    return (
        <div className="card-wrapper" id="cards-with-nav">
            <div className="cards">
                {pokedex && type == 'reg' ? pokedex.map((poke, index) => {
                    return (
                        index >= start && index < end &&
                        <PokeCard key={poke.pokemon_species.name} name={poke.pokemon_species.name} pokeNum={poke.pokemon_species.url.substring(42, poke.pokemon_species.url.length-1)}/>
                )}) : pokedex && type == 'gen' ? pokedex.map((poke, index) => {
                    return (
                        index >= start && index < end &&
                        <PokeCard key={poke.name} name={poke.name} pokeNum={poke.url.substring(42, poke.url.length - 1)}/>
                )}) : null}
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