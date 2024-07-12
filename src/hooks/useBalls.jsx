import {useState} from "react";
import {isColliding} from "/src/utils/isColliding"

const setupBalls = (environment) => {
    const {envSize, nBalls, ...props} = environment;
    const initialOffset = 0.1; // to prevent balls from bouncing on corners
    const initialBalls = Array.from({length: nBalls}, (_, index) => ({
        position: [
            Math.floor(Math.random() * envSize - envSize / 2) + initialOffset,
            Math.floor(Math.random() * envSize - envSize / 2) + initialOffset,
        ],
        velocity: [
            Math.floor(Math.random() * 10) - 5,
            Math.floor(Math.random() * 10) - 5,
        ],
        id: index,
    }));
    return initialBalls;
}

const computeBorderBounce = (ball, environment, ballVelocity) => {
    // console.log(ball.position);
    let [x, y] = ball.position;
    let [vx, vy] = ballVelocity;
    const envHalfSize = environment.envSize / 2;
    // Compute the collision
    if (x < -envHalfSize) vx = Math.abs(vx);
    if (x > envHalfSize) vx = -Math.abs(vx);
    if (y < -envHalfSize) vy = Math.abs(vy);
    if (y > envHalfSize) vy = -Math.abs(vy);
    // Return the resulting velocity
    return [vx, vy];
}

const computeBlockBounce = (ball, blocks, ballVelocity) => {
    let [x, y] = ball.position;
    let [vx, vy] = ballVelocity;
    // Compute the collisions
    blocks.forEach(block => {
        if (block.active && isColliding(ball, block)) {
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
    // Return the resulting velocity
    return [vx, vy];
}

const computeBallBounce = (ball, allBalls, ballVelocity) => {
    // Filter out the ball we're comparing
    const otherBalls = allBalls.filter(({id}) => id !== ball.id);
    // Check for collisions against all other balls
    let [x, y] = ball.position;
    let [vx, vy] = ballVelocity;
    otherBalls.forEach((otherBall, index) => {
        const dx = otherBall.position[0] - x;
        const dy = otherBall.position[1] - y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance <= 12) {
            // Reverse velocity on collision
            const dxn = dx / distance;
            const dyn = dy / distance;
            const dotProduct = vx * dxn + vy * dyn;

            if (dotProduct > 0) {
                vx = vx - 2 * dotProduct * dxn;
                vy = vy - 2 * dotProduct * dyn;
            }
        }
    })
    return [vx, vy];
}

export function useBalls(environment) {
    const [balls, setBalls] = useState(setupBalls(environment));

    const updateBalls = (blocks) => {
        const updatedBalls = balls.map((ball, index) => {
            // Update the position
            let updatedPosition = [
                ball.position[0] + ball.velocity[0],
                ball.position[1] + ball.velocity[1],
            ]

            // Update the velocity
            let updatedVelocity = ball.velocity;
            updatedVelocity = computeBorderBounce(ball, environment, updatedVelocity);
            updatedVelocity = computeBlockBounce(ball, blocks, updatedVelocity);
            updatedVelocity = computeBallBounce(ball, balls, updatedVelocity);

            // Set and return
            return {
                ...ball,
                position: updatedPosition,
                velocity: updatedVelocity
            };
        })
        setBalls(updatedBalls);
    }

    return [balls, updateBalls];
}