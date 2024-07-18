import "./GameData.scss"

function ColorDisplay({values, label}) {
    return (
        <>
            <div className="colorDisplayLabel">{label}</div>
            {values.map((value, index) => <div key={index} className={`colorDisplayNumber color-${index}`}>
                    {value}
                </div>
            )}
        </>
    )
}

function GameData({settings, Balls, Blocks}) {
    // Grab relevant settings
    const nColors = settings.nColors;
    // Calculate the area of each color
    const colorAreas = [...Array(nColors).keys()].map((color) => {
        const blocksOfColor = Blocks.filter((block) => block.color === color)
        return blocksOfColor.length
    })

    // Calculate the total speed of each set of balls
    const ballSpeeds = [...Array(nColors).keys()].map((color) => {
        const ballsOfColor = Balls.filter((ball) => ball.color === color)
        const speed = ballsOfColor.reduce((acc, ball) => acc + Math.sqrt(ball.velocity[0] ** 2 + ball.velocity[1] ** 2), 0)
        // Format speed to 2 decimal places
        return speed.toFixed(2)
    })

    return (<div className="gameData" style={{gridTemplateColumns: `2fr repeat(${nColors}, 1fr)`}}>
        <ColorDisplay values={colorAreas} label="Area"/>
        <ColorDisplay values={ballSpeeds} label="Speeds"/>
    </div>)
}

export default GameData