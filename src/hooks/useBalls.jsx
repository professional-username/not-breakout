import {useState} from "react";
import {isColliding} from "/src/utils/isColliding"

export function useBalls(environment) {
    const initialOffset = 0.1; // to prevent balls from bouncing on corners

    const [balls, setBalls] = useState(() =>
        Array.from({length: environment.nBalls}, () => ({
            position: [
                Math.floor(Math.random() * environment.size * 2 - environment.size) + initialOffset,
                Math.floor(Math.random() * environment.size * 2 - environment.size) + initialOffset,
            ],
            velocity: [
                Math.floor(Math.random() * 10) - 5,
                Math.floor(Math.random() * 10) - 5,
            ],
        }))
    );

    const updateBalls = (blockEnvironment) => {
        // Update every ball position with every velocity
        const ballsWithNewPositions = balls.map((ball, index) => {
            let [x, y] = ball.position;
            let [vx, vy] = ball.velocity;
            return {
                ...ball,
                position: [x + vx, y + vy],
            };
        })

        const ballsWithNewVelocities = ballsWithNewPositions.map((ball, index) => {
            let [x, y] = ball.position;
            let [vx, vy] = ball.velocity;


            // Check for collision with world borders
            if (x < -environment.size) vx = Math.abs(vx);
            if (x > environment.size) vx = -Math.abs(vx);
            if (y < -environment.size) vy = Math.abs(vy);
            if (y > environment.size) vy = -Math.abs(vy);


            // Check collision with blocks
            blockEnvironment.forEach(block => {
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
                    return {
                        ...ball,
                        velocity: [vx, vy],
                    }
                }
            });

            // Check collision with balls
            balls.forEach((otherBall, otherIndex) => {
                if (index !== otherIndex) {
                    // Reverse velocity on collision
                    const dx = otherBall.position[0] - x;
                    const dy = otherBall.position[1] - y;

                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance <= 12) {
                        const dxn = dx / distance;
                        const dyn = dy / distance;
                        const dotProduct = vx * dxn + vy * dyn;

                        if (dotProduct > 0) {
                            vx = vx - 2 * dotProduct * dxn;
                            vy = vy - 2 * dotProduct * dyn;
                        }
                    }
                }
            })

            return {
                ...ball,
                velocity: [vx, vy],
            }
        });

        setBalls(ballsWithNewVelocities);
    }

    return [balls, updateBalls];
}