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
    const ballEnergies = [...Array(nColors).keys()].map((color) => {
        const ballsOfColor = Balls.filter((ball) => ball.color === color)
        const speed = ballsOfColor.reduce((acc, ball) => acc + 0.5 * (ball.velocity[0] ** 2 + ball.velocity[1] ** 2) - 0.1 * (ball.position[1] - 194), 0)
        // Format speed to 2 decimal places
        return speed.toFixed(2)
    })
    const ballGEnergies = [...Array(nColors).keys()].map((color) => {
        const ballsOfColor = Balls.filter((ball) => ball.color === color)
        const speed = ballsOfColor.reduce((acc, ball) => acc + -0.1 * (ball.position[1] - 194), 0
        )
        // Format speed to 2 decimal places
        return speed.toFixed(2)
    })

    const ballMomentumsX = [...Array(nColors).keys()].map((color) => {
        const ballsOfColor = Balls.filter((ball) => ball.color === color)
        const speed = ballsOfColor.reduce((acc, ball) => acc + Math.abs(ball.velocity[0]), 0)
        // Format speed to 2 decimal places
        return speed.toFixed(2)
    })

    const ballMomentumsY = [...Array(nColors).keys()].map((color) => {
        const ballsOfColor = Balls.filter((ball) => ball.color === color)
        const speed = ballsOfColor.reduce((acc, ball) => acc + Math.abs(ball.velocity[1]), 0)
        // Format speed to 2 decimal places
        return speed.toFixed(2)
    })

    return (<div className="gameData" style={{gridTemplateColumns: `2fr repeat(${nColors}, 1fr)`}}>
        <ColorDisplay values={colorAreas} label="Area"/>
        {/*<ColorDisplay values={ballEnergies} label="KE"/>*/}
        {/*<ColorDisplay values={ballGEnergies} label="GPE"/>*/}
        {/*<ColorDisplay values={ballMomentumsX} label="MomentumsX"/>*/}
        {/*<ColorDisplay values={ballMomentumsY} label="MomentumsY"/>*/}
    </div>)
}

export default GameData