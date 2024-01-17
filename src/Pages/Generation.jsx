import { useState, useEffect } from "react"
import { useLoaderData } from "react-router-dom"
import GenerationList from "../Components/GenerationList"

let globGeneration = "1"

export default function Generation () {
    const generations = useLoaderData().results
    const url = 'https://pokeapi.co/api/v2/generation'
    const [generationURL, setGenerationURL] = useState(`${url}/${globGeneration}`)
    
    return (
        <>
            <nav className='genNav'>{generations.map(generation => {
                const searchTag = 'generation/'
                const genName = generation.url.substring(generation.url.search(searchTag) + searchTag.length, generation.url.length - 1)
                return (
                    <button key={generation.name} className={genName == globGeneration ? 'activeGenBut' : 'genBut'} onClick={() => {globGeneration = genName, setGenerationURL(`${url}/${genName}`)}}>
                        {`Gen ${genName}`}
                    </button>)
                })}
            </nav>
            {generationURL && <GenerationList url={generationURL}/>}
        </>
    )
}

export const generationLoader = async () => {
    const res = await fetch('https://pokeapi.co/api/v2/generation')

    return res.json()
}