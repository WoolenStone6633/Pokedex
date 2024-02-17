import css from "./PokeBasicInfo.module.css"

// displays the basic information of a pokemon including an image, its name and typing
export default function PokeBasicInfo({imgURL, name, typingN = '', typings = null}) {
    return (
        <div className={css.basicInfo}>
            {name.substring(0, 4) == 'Name' ? (<>
                <img className={css.titlePokemon} src={imgURL}></img>
                <p><strong>Name: </strong> {name.substring(5).replaceAll('-', ' ')}</p>
            </>) : (<>
                <img src={imgURL}></img>
                <p>{name.replaceAll('-', ' ')}</p>
            </>)}
            {typings != null && 
                <p><strong>{typingN}</strong>{typings[0].type.name}{typings.length > 1 && (', ' + typings[1].type.name)}</p>
            }
        </div>
    )
}