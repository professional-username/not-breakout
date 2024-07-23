import "./GameData.scss"
import {useSettingsContext} from "../../contexts/SettingsContext.jsx";

function ColorDisplay({values, label}) {
    return (
        <>
            <div className="game-data__row-label">{label}</div>
            {values.map((value, index) => <div key={index} className={`game-data__element color-${index}`}>
                    {value.toFixed(0)}
                </div>
            )}
        </>
    )
}

function GameData({Balls, Blocks}) {
    const {settings} = useSettingsContext()
    // Grab relevant settings
    const nColors = settings.nColors;
    // Calculate the area of each color
    const colorAreas = [...Array(nColors).keys()].map((color) => {
        const blocksOfColor = Blocks.filter((block) => block.color === color)
        return blocksOfColor.length
    })


    // Filter out the balls of every color to do calculations on them
    const ballsOfColor = [...Array(nColors).keys()].map((color) => {
        return Balls.filter((ball) => ball.color === color);
    })

    // Calculate KE of balls by color
    const ballsKE = ballsOfColor.map((balls) => {
        return balls.reduce((acc, ball) => acc + 0.5 * (ball.velocity[0] ** 2 + ball.velocity[1] ** 2), 0)
    })

    // Calculate GPE of balls by color
    const gravity = settings.gravity;
    const floorHeight = settings.envSize / 2;
    const ballsGPE = ballsOfColor.map((balls) => {
        return balls.reduce((acc, ball) => acc - gravity * (ball.position[1] - floorHeight), 0)
    })

    // Calculate total energy of balls by color
    const ballsTE = ballsKE.map((ballKE, index) => {
        const ballGPE = ballsGPE[index];
        return ballKE + ballGPE;
    })


    // Calculate the ratios
    const totalArea = Blocks.length;
    const areaRatios = colorAreas.map((area) => 100 * area / totalArea)
    const totalEnergy = ballsTE.reduce((acc, energy) => acc + energy, 0)
    const energyRatios = ballsTE.map((energy) => 100 * energy / totalEnergy)

    // TODO: Implement area-based order

    return (<div className="game-data" style={{gridTemplateColumns: `2fr repeat(${nColors}, 1fr)`}}>
        <ColorDisplay values={colorAreas} label="Area"/>
        <ColorDisplay values={ballsTE} label="Energy"/>
        <ColorDisplay values={areaRatios} label="Area Ratios"/>
        <ColorDisplay values={energyRatios} label="Energy Ratios"/>
        {/*<ColorDisplay values={ballGEnergies} label="GPE"/>*/}
        {/*<ColorDisplay values={ballMomentumsX} label="MomentumsX"/>*/}
        {/*<ColorDisplay values={ballMomentumsY} label="MomentumsY"/>*/}
    </div>)
}

export default GameData