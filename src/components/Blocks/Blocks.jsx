import "./Blocks.css"


function Blocks({blocks}) {
    return (
        <div className="blocks">
            {blocks.map((blockParams) => <Block key={blockParams.id} {...blockParams}/>)}
        </div>
    )
}

function Block({...blockParams}) {
    return (
        <div className={`block ${blockParams.active ? "active" : "inactive"}`} style={{
            translate: `${blockParams.position.x}px ${blockParams.position.y}px`,
            width: blockParams.size,
            height: blockParams.size,
        }}/>
    )
}

export default Blocks