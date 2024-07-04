import {useState, useEffect} from 'react'
import './App.css'


function useEnvironment() {
    const [environment, setEnvironment] = useState({
        size: 200,
        nBalls: 3,
        ballSize: 6,
        nBlocks: 20, // Per side
    });
    return environment;
}

function useBalls(environment) {
    // Set up balls in random positions within the environment
    const initialOffset = 0.1; // to prevent balls from bouncing on corners
    const [ballPositions, setBallPositions] = useState(
        Array.from({length: environment.nBalls}, () => [
            Math.floor(Math.random() * environment.size * 2 - environment.size) + initialOffset,
            Math.floor(Math.random() * environment.size * 2 - environment.size) + initialOffset,
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
        const newBallVelocities = ballPositions.map(([x, y], index) => {
            let [vx, vy] = ballVelocities[index];

            // Check for collision with world borders
            if (x < -environment.size) vx = Math.abs(vx);
            if (x > environment.size) vx = -Math.abs(vx);
            if (y < -environment.size) vy = Math.abs(vy);
            if (y > environment.size) vy = -Math.abs(vy);

            // Check collision with blocks
            blockEnvironment.forEach(block => {
                if (block.active && isColliding(x, y, block)) {
                    // Reverse velocity on collision
                    const dx = x - block.position.x;
                    const dy = y - block.position.y;
                    if (Math.abs(dx) > Math.abs(dy)) {
                        if (dx > 0) vx = Math.abs(vx);
                        if (dx < 0) vx = -Math.abs(vx);
                    } else {
                        if (dy > 0) vy = Math.abs(vy);
                        if (dy < 0) vy = -Math.abs(vy);
                    }

                }
            });

            return [vx, vy];
        })

        setBallVelocities(newBallVelocities)
    }

    return [ballPositions, ballVelocities, updateBallPositions, updateBallVelocities];
}

function useBlockEnvironment(environment) {
    const {size, nBlocks} = environment;
    // Generate blocks to fill the environment
    const initialBlockEnvironment = () => {
        const blocks = [];
        const blockSize = 2 * size / nBlocks;

        for (let row = 0; row <= nBlocks; row++) {
            for (let col = 0; col <= nBlocks; col++) {
                const position = {
                    x: -size + col * blockSize,
                    y: -size + row * blockSize,
                };
                const id = `${row}-${col}`
                blocks.push({
                    size: blockSize,
                    position: position,
                    id: id,
                    active: true,
                });
            }
        }
        return blocks;
    };

    const [blockEnvironment, setBlockEnvironment] = useState(initialBlockEnvironment());

    // Disable blocks that are colliding with balls
    const updateBlockEnvironment = (ballPositions) => {
        setBlockEnvironment(prevBlocks =>
            prevBlocks.map(block => {
                // console.log(ballPositions.some(([x, y]) => isColliding(x, y, block)));
                return {
                    ...block,
                    active: block.active && !ballPositions.some(([x, y]) => isColliding(x, y, block)),
                }
                // if (block.active && ballPositions.some(([x, y]) => isColliding(x, y, block))) {
                //     return { ...block, active: false };
                // }
                // return block;
            })
        );
    };

    return [blockEnvironment, updateBlockEnvironment];
}

function isColliding(ballX, ballY, block) {
    const ballRadius = 6; // Assume ball radius
    const blockHalfSize = block.size / 2;

    const distX = Math.abs(ballX - block.position.x) - ballRadius;
    const distY = Math.abs(ballY - block.position.y) - ballRadius;

    // console.log(distX, distY, blockHalfSize);

    return (distX <= blockHalfSize && distY <= blockHalfSize)
    // if (distX <= blockHalfSize) return true;
    // if (distY <= blockHalfSize) return true;

    // return false;
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
        <div className={`block ${blockParams.active ? "active" : "inactive"}`} style={{
            translate: `${blockParams.position.x}px ${blockParams.position.y}px`,
            width: blockParams.size,
            height: blockParams.size,
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
        <div className="gameBoard" style={{height: environment.size * 2, width: environment.size * 2}}>
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
