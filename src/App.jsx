import {useState, useEffect} from 'react'
import './App.css'


function useEnvironment() {
    const [environment, setEnvironment] = useState({
        size: 100,
        nBalls: 2,
        ballSize: 5,
        nBlocks: 10, // Per side
    });
    return environment;
}

function useBalls(environment) {
    // Set up balls in random positions within the environment
    const [ballPositions, setBallPositions] = useState(
        Array.from({length: environment.nBalls}, () => [
            Math.floor(Math.random() * environment.size),
            Math.floor(Math.random() * environment.size),
        ])
    )
    // Assign random velocities to the balls
    const [ballVelocities, setBallVelocities] = useState(
        Array.from({length: environment.nBalls}, () => [
            Math.floor(Math.random() * 10) - 5,
            Math.floor(Math.random() * 10) - 5,
        ])
    );

    const updateBallPositions = () => {
        // Update every ball position with every velocity
        const newBallPositions = ballPositions.map(([x, y], index) => {
            let [vx, vy] = ballVelocities[index];
            return [x + vx, y + vy];
        });
        setBallPositions(newBallPositions);
    }

    const updateBallVelocities = (blockEnvironment) => {
        // Check every ball position against every block
        // and the edges of the environment
        const newBallVelocities = ballPositions.map(([x, y], index) => {
            let [vx, vy] = ballVelocities[index];
            if (x < -environment.size) vx = Math.abs(vx);
            if (x > environment.size) vx = -Math.abs(vx);
            if (y < -environment.size) vy = Math.abs(vy);
            if (y > environment.size) vy = -Math.abs(vy);
            return [vx, vy];
        })
        // TODO
        setBallVelocities(newBallVelocities)
    }
    return [ballPositions, ballVelocities, updateBallPositions, updateBallVelocities];
}

function useBlockEnvironment(environment) {
    const {size, nBlocks} = environment;
    // Generate blocks to fill the environment
    const initialBlockEnvironment = () => {
        const blocks = [];
        const blockWidth = size / nBlocks;
        const blockHeight = size / nBlocks;

        for (let row = 0; row <= nBlocks; row++) {
            for (let col = 0; col <= nBlocks; col++) {
                const position = {
                    x: -size + col * blockWidth * 2,
                    y: -size + row * blockHeight * 2,
                };
                const id = `${row}-${col}`
                blocks.push({
                    position: position,
                    id: id,
                    active: true,
                });
            }
        }
        return blocks;
    };

    const [blockEnvironment, setBlockEnvironment] = useState(initialBlockEnvironment());
    const updateBlockEnvironment = (ballPositions) => {
        // Check collisions between the blocks and the balls
        // TODO
    }
    return [blockEnvironment, updateBlockEnvironment];
}

function Balls({ballPositions}) {
    return (
        <div className="balls">
            {ballPositions.map((ballPosition, index) => <Ball key={index} ballPosition={ballPosition}/>)}
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

function Block({...blockParams}) {
    return (
        <div className="block" style={{
            translate: `${blockParams.position.x}px ${blockParams.position.y}px`,
        }}/>
    )
}

function Game() {

    const environment = useEnvironment();
    const [ballPositions, ballVelocities, updateBallPositions, updateBallVelocities] = useBalls(environment);
    const [blockEnvironment, updateBlockEnvironment] = useBlockEnvironment(environment);

    useEffect(() => {
        const interval = setInterval(() => {
            updateBallPositions();
            updateBallVelocities(blockEnvironment);
            updateBlockEnvironment(ballPositions);
        }, 10);
        return () => clearInterval(interval);
    }, [ballPositions, ballVelocities, blockEnvironment, updateBallVelocities, updateBlockEnvironment]);

    return (
        <div className="gameBoard">
            <div className="blocks">
                {blockEnvironment.map((blockParams) => <Block key={blockParams.id} {...blockParams}/>)}
            </div>
            <Balls ballPositions={ballPositions}/>
        </div>
    )
}


function App() {
    return (
        <div className="App">
            <h1>Not Breakout</h1>
            <Game/>
        </div>
    )
}

export default App
