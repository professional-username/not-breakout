import "./Balls.css"

function Balls({balls}) {
    return (
        <div className="balls">
            {balls.map((ball, index) => <Ball key={index} ballPosition={ball.position}/>)}
        </div>
    )
}

function Ball({ballPosition}) {
    return (
        <div className="ball" style={{
            translate: `${ballPosition[0]}px ${ballPosition[1]}px`,
        }}/>
    )
}

export default Balls
