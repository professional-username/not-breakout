import "./GameData.scss"

function GameData({settings, Balls, Blocks}) {
    // Calculate the area of each color
    const colorAreas = [...Array(settings.nColors).keys()].map((color) => {
        const blocksOfColor = Blocks.filter((block) => block.color === color)
        return blocksOfColor.length
    })

    return (
        <div className="gameData">
            <p>Game data?</p>
            <p>{colorAreas.map((area, index) => `${index}: ${area}\n`)}</p>
        </div>
    )
}

export default GameData