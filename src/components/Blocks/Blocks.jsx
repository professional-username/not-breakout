import "./Blocks.scss"


function Blocks({blocks}) {
    return (
        <div className="blocks">
            {blocks.map((blockParams) => <Block key={blockParams.id} {...blockParams}/>)}
        </div>
    )
}

function Block({...blockParams}) {
    return (
        <div className={`block color-${blockParams.color}`} style={{
            translate: `${blockParams.position.x}px ${blockParams.position.y}px`,
            width: blockParams.size + (blockParams.borderLeft ? -2 : 0),
            height: blockParams.size + (blockParams.borderTop ? -2 : 0),

            borderLeft: blockParams.borderLeft ? "2px solid var(--border-color)" : "",
            // borderRight: blockParams.borderLeft ? "2px solid var(--border-color)" : "",
            // paddingRight: blockParams.borderLeft ? "1px" : "",

            borderTop: blockParams.borderTop ? "2px solid var(--border-color)" : "",
            // borderBottom: blockParams.borderTop ? "2px solid var(--border-color)" : "",
            // paddingBottom: blockParams.borderTop ? "1px" : "",
        }}/>
    )
}

export default Blocks