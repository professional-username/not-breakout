import {useState, useEffect, useRef} from 'react'
import './App.css'

function useBall(boardSize, ballSpeed) {
    const [ballPosition, setBallPosition] = useState([boardSize[0] / 2, boardSize[1] / 2]);
    const [ballVelocity, setBallVelocity] = useState([ballSpeed[0], ballSpeed[1]]);
    const updateBallPosition = () => {
        let [x, y] = ballPosition;
        let [xv, yv] = ballVelocity;

        if (x < -boardSize[0]) xv = Math.abs(xv);
        if (x > boardSize[0]) xv = -Math.abs(xv);
        if (y < -boardSize[1]) yv = Math.abs(yv);
        if (y > boardSize[1]) yv = -Math.abs(yv);

        // Then update the position
        setBallPosition([x + xv, y + yv]);
        setBallVelocity([xv, yv]);

    }
    return [ballPosition, updateBallPosition];
}

function Ball({ballPosition}) {
    return (
        <div
            className="ball"
            style={{
                transform: `translate(${ballPosition[0]}px, ${ballPosition[1]}px)`,
            }}
        />
    )
}


function Game() {
    const [boardSize, setBoardSize] = useState([100, 100]);
    const [ballPosition, updateBallPosition] = useBall(boardSize, [1, 2]);

    const intervalRef = useRef(null);
    // Update the ball position every 10ms
    useEffect(() => {
        intervalRef.current = setInterval(updateBallPosition, 10);
        return () => clearInterval(intervalRef.current); // Cleanup on unmount
    }, [updateBallPosition]);

    return (
        <div className="gameBoard" style={
            {
                width: boardSize[0] * 2,
                height: boardSize[1] * 2,
            }
        }>
            <Ball ballPosition={ballPosition}/>
        </div>
    )
}


function App() {
    return (
        <div className="App">
            <h1>Bouncing Ball Game</h1>
            <Game/>
        </div>
    )
}

export default App
