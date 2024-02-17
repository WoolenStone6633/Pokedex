import { useState} from "react"
import { useLoaderData } from "react-router-dom"
import RegGenList from "../Components/RegGenList"

let globGeneration = "1"

// handles the generation information along with the generation nav
export default function Generation () {
    const generations = useLoaderData().results
    const url = 'https://pokeapi.co/api/v2/generation'
    const [generationURL, setGenerationURL] = useState(`${url}/${globGeneration}`)
    
    return (
        <div className="reg-gen-wrapper">
            <nav>
                <ul class='nav-list'>
                    <li className="nav-title">Generations: </li>
                    {generations.map(generation => {
                    const searchTag = 'generation/'
                    const genName = generation.url.substring(generation.url.search(searchTag) + searchTag.length, generation.url.length - 1)
                    return (
                        <li key={generation.name} className={genName == globGeneration && 'activeNav'} onClick={() => {globGeneration = genName, setGenerationURL(`${url}/${genName}`)}}>
                            {`Gen ${genName}`}
                        </li>)
                    })}
                </ul>
            </nav>
            {generationURL && <RegGenList url={generationURL} type={'gen'}/>}
        </div>
    )
}

export const generationLoader = async () => {
    const res = await fetch('https://pokeapi.co/api/v2/generation')

    return res.json()
}