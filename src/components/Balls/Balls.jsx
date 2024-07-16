import "./Balls.scss"

function Balls({balls}) {
    return (
        <div className="balls">
            {balls.map((ball, index) => <Ball key={index} ballPosition={ball.position} ballColor={ball.color}/>)}
        </div>
    )
}

function Ball({ballPosition, ballColor}) {
    return (
        <div className={`ball color-${ballColor}`} style={{
            translate: `${ballPosition[0]}px ${ballPosition[1]}px`,
        }}/>
    )
}

export default Balls
