import {useState} from "react";
import {isColliding} from "/src/utils/isColliding"

const setupBlocks = (environment) => {
    const {envSize, blockSize, ...props} = environment;
    const blocksPerSide = Math.floor(envSize / blockSize);
    const maxBlockOffset = blocksPerSide * blockSize / 2;

    const initialBlocks = [];
    for (let row = 0; row <= blocksPerSide; row++) {
        for (let col = 0; col <= blocksPerSide; col++) {
            const position = {
                x: -maxBlockOffset + col * blockSize,
                y: -maxBlockOffset + row * blockSize,
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