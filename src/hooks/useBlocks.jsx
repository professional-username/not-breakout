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
                color: 0,
                borderTop: false,
                borderLeft: false,
            });
        }
    }


    return initialBlocks
}

export function useBlocks(environment) {
    // Generate blocks to fill the environment
    const [blocks, setBlocks] = useState(setupBlocks(environment));

    // Change the color of blocks that are colliding with balls
    const updateBlocks = (balls) => {
        const updatedColorBlocks = blocks.map((block, index) => {
            // Update the block color
            let newColor = block.color;
            balls.forEach((ball) => {
                if (isColliding(ball, block)) {
                    newColor = ball.color
                }
            })
            return {
                ...block,
                color: newColor,
            };
        })

        const updatedBorderBlocks = updatedColorBlocks.map((block, index) => {
            // Left Borders
            const blockCol = block.id.split('-')[1];
            let borderLeft = false;
            if (blockCol !== "0") {
                borderLeft = (block.color !== updatedColorBlocks[index - 1].color);
            }

            // Top borders
            const blocksPerSide = Math.floor(environment.envSize / environment.blockSize);
            let borderTop = false;
            if (index > blocksPerSide) {
                borderTop = (block.color !== updatedColorBlocks[index - blocksPerSide-1].color);
            }

            return {
                ...block,
                borderLeft: borderLeft,
                borderTop: borderTop,
            };
        })

        setBlocks(updatedBorderBlocks);
    };

    return [blocks, updateBlocks];
}