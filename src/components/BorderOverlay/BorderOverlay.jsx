import "./BorderOverlay.scss"


function Borders({blocks}) {
    return (
        <div className="borders">
            {blocks.map((blockParams) => <BorderBlock key={blockParams.id} {...blockParams}/>)}
        </div>
    )
}

function BorderBlock({...blockParams}) {
    return (
        <div className="border" style={{
            translate: `${blockParams.position.x}px ${blockParams.position.y}px`,
            width: blockParams.size,
            height: blockParams.size,

            borderLeft: blockParams.borders.left ? "1px solid var(--border-color)" : "1px solid transparent",
            borderTop: blockParams.borders.top ? "1px solid var(--border-color)" : "1px solid transparent",
            borderRight: blockParams.borders.right ? "1px solid var(--border-color)" : "1px solid transparent",
            borderBottom: blockParams.borders.bottom ? "1px solid var(--border-color)" : "1px solid transparent",
        }}/>
    )
}

export default Borders