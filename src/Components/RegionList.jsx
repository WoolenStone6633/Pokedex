import { useState, useEffect } from "react"

export default function Region ({url}) {
    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => console.log())
    }, [url])
    
    return (
        <p>Displays a list of the pokemon in this region {url}</p>
    )
}