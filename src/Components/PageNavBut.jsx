export default function PageNavBut (dLimit = 20, cOffset, cEnd, cLimit, pokedexEnd, bURL, endDex) { //default limit, current offset, current end, current limit, end of pokedex, base URL, boolean end of pokedex
    
    const nextBut = () => {
        (cOffset - (pokedexEnd - dLimit * 2)) > 0 && (
            cLimit = (pokedexEnd - dLimit) - cOffset
        )

        cOffset < (pokedexEnd - dLimit) && (
            cOffset += dLimit, 
            setURL(bURL + '?offset=' + cOffset + '&limit=' + cLimit)
        )
    }

    const prevBut = () => {
        cOffset >= dLimit && cLimit == dLimit ? (
            cOffset -= dLimit,
            setURL(bURL + '?offset=' + cOffset + '&limit=' + cLimit)
        ) : cOffset < dLimit && cOffset > 0 && cLimit == dLimit ? (
            cOffset = 0,
            setURL(bURL + '?offset=' + cOffset + '&limit=' + cLimit)
        ) : (
            cOffset -= dLimit,
            cLimit = dLimit,
            setURL(bURL + '?offset=' + cOffset + '&limit=' + dLimit)
        )
    }

    // const nextBut = () => {
    //     (cOffset - (pokedexEnd - dLimit * 2)) > 0 && (
    //         cLimit = (pokedexEnd - dLimit) - cOffset
    //     )

    //     cOffset < (pokedexEnd - dLimit) && (
    //         cOffset += dLimit,
    //         cEnd += cLimit,
    //         render(Math.random())
    //     )
    //     cEnd == pokedexEnd ? endDex = true : endDex = false
    // }

    // const prevBut = () => {
    //     cOffset >= dLimit && cLimit == dLimit ? (
    //         cOffset -= dLimit,
    //         cEnd = cOffset + dLimit,
    //         render(Math.random())
    //     ) : cOffset < dLimit && cOffset > 0 && cLimit == dLimit ? (
    //         cOffset = 0,
    //         cEnd = dLimit,
    //         render(Math.random())
    //     ) : cLimit != dLimit && (
    //         cOffset -= dLimit, 
    //         cEnd = cOffset + dLimit,
    //         cLimit = dLimit, 
    //         render(Math.random())
    //     )
    //     endDex = false
    // }
    
    return (
        <div className="pageNavBut">
            <button id="backBut" onClick={prevBut}>Back</button>
            <button id="nextBut" onClick={nextBut}>Next</button>
        </div>
    )
}