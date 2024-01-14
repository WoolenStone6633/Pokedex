// displays the basic information of a pokemon including an image, its name and typing
export default function PokeBasicInfo({imgURL, name, typings = null}) {
    return (
        <div>
            <img src={imgURL}></img>
            <p className="pokeName">{name.replaceAll('-', ' ')}</p>
            {typings != null && 
                <div>Typing: {typings[0].type.name}{typings.length > 1 && (', ' + typings[1].type.name)}</div>}
        </div>
    )
}