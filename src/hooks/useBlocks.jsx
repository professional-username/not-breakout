import {useState} from "react";
import {isColliding} from "/src/utils/isColliding"

const setupBlocks = (environment) => {
    const {size, nBlocks, ...props} = environment;
    const initialBlocks = [];
    const blockSize = 2 * size / nBlocks;

    for (let row = 0; row <= nBlocks; row++) {
        for (let col = 0; col <= nBlocks; col++) {
            const position = {
                x: -size + col * blockSize,
                y: -size + row * blockSize,
            };
            const id = `${row}-${col}`
            initialBlocks.push({
                size: blockSize,
                position: position,
                id: id,
                active: true,
            });
        }
    }

    return initialBlocks
}

export function useBlocks(environment) {
    // Generate blocks to fill the environment
    const [blockEnvironment, setBlockEnvironment] = useState(setupBlocks(environment));

    // Disable blocks that are colliding with balls
    const updateBlockEnvironment = (balls) => {
        setBlockEnvironment(prevBlocks =>
            prevBlocks.map(block => {
                return {
                    ...block,
                    active: block.active && !balls.some((ball) => isColliding(ball, block)),
                }
            })
        );
    };

    return [blockEnvironment, updateBlockEnvironment];
}