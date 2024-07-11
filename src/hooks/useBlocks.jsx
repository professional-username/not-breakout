import {useState} from "react";
import {isColliding} from "/src/utils/isColliding"


export function useBlocks(environment) {
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