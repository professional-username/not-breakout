import {useState} from "react";
import {isColliding} from "/src/utils/isColliding"
import {useSettingsContext} from "../contexts/SettingsContext.jsx";

const setupBalls = (settings) => {
    const {ballRadius, envSize, nBallsPerColor, nColors, ...props} = settings;
    const nBalls = nBallsPerColor * nColors;
    const initialOffset = 0.1; // to prevent balls from bouncing on corners
    const initialBalls = Array.from({length: nBalls}, (_, index) => ({
        position: [
            Math.floor(Math.random() * envSize - envSize / 2) + initialOffset,
            Math.floor(Math.random() * envSize - envSize / 2) + initialOffset,
        ],
        velocity: [
            (Math.floor(Math.random() * 8) - 4),
            (Math.floor(Math.random() * 8) - 4),
        ],
        radius: ballRadius,
        id: index,
        color: index % nColors,
    }));
    return initialBalls;
}

const computeBorderTeleport = (ball, settings) => {
    let [x, y] = ball.position;
    const envHalfSize = settings.envSize / 2;
    if (x < -envHalfSize) x = envHalfSize;
    if (x > envHalfSize) x = -envHalfSize;
    if (y < -envHalfSize) y = envHalfSize;
    if (y > envHalfSize) y = -envHalfSize;
    return [x, y];
}

const computeBorderBounce = (ball, settings, ballVelocity) => {
    let [x, y] = ball.position;
    let [vx, vy] = ballVelocity;
    const envHalfSize = settings.envSize / 2;
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
    const [x, y] = ball.position;
    const [vx, vy] = ballVelocity;
    let [vx1, vy1] = [vx, vy]; // So we're not directly changing anything
    otherBalls.forEach(otherBall => {
        const dx = otherBall.position[0] - x;
        const dy = otherBall.position[1] - y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance <= ball.radius * 2) {
            // Calculate the angle of reflection
            const theta = Math.atan2(dy, dx);
            const sinTheta = Math.sin(theta);
            const cosTheta = Math.cos(theta);

            // Get the velocity of the other ball
            const [vx2, vy2] = otherBall.velocity;

            // Rotate velocities
            let vx1r = vx1 * cosTheta + vy1 * sinTheta;
            let vy1r = -vx1 * sinTheta + vy1 * cosTheta;
            let vx2r = vx2 * cosTheta + vy2 * sinTheta;
            let vy2r = -vx2 * sinTheta + vy2 * cosTheta;

            // Scale the kinetic energy to keep it constant
            const initialKE = Math.sqrt(vx1r * vx1r + vy1r * vy1r) + Math.sqrt(vx2r * vx2r + vy2r * vy2r);
            const afterKE = Math.sqrt(vx2r * vx2r + vy1r * vy1r) + Math.sqrt(vx1r * vx1r + vy2r * vy2r);
            const e = 1;
            const scaleKE = e * initialKE / afterKE;

            // Bounce
            vx1r = (vx1r + vx2r - Math.abs(vx1r - vx2r)) / 2

            // Scale the velocities using calculated KE scale
            vx1r *= scaleKE;
            vy1r *= scaleKE;

            // Rotate back
            vx1 = vx1r * cosTheta - vy1r * sinTheta;
            vy1 = vx1r * sinTheta + vy1r * cosTheta;
        }
    })
    return [vx1, vy1];
}

const computeGravity = (ballVelocity, gravity = 0.1) => {
    const [vx, vy] = ballVelocity;
    return [vx, vy + gravity / 2];
}

export function useBalls() {
    const {settings} = useSettingsContext();
    const [balls, setBalls] = useState(setupBalls(settings));

    const updateBalls = (blocks) => {
        const updatedBalls = balls.map((ball, index) => {
                // Compute bouncing off of other balls
                let updatedVelocity = ball.velocity;
                updatedVelocity = computeBallBounce(ball, balls, updatedVelocity);
                updatedVelocity = computeBlockBounce(ball, blocks, updatedVelocity);
                if (settings.enableBorders) {
                    updatedVelocity = computeBorderBounce(ball, settings, updatedVelocity);
                }
                updatedVelocity = computeGravity(updatedVelocity, settings.gravity);

                // Update the position
                let updatedPosition = ball.position;
                if (!settings.enableBorders) {
                    updatedPosition = computeBorderTeleport(ball, settings);
                }
                updatedPosition = [
                    updatedPosition[0] + updatedVelocity[0],
                    updatedPosition[1] + updatedVelocity[1],
                ]

                // Gravity has to be updated as an average over the movement of the ball
                updatedVelocity = computeGravity(updatedVelocity, settings.gravity);

                // Set and return
                return {
                    ...ball,
                    position: updatedPosition,
                    velocity: updatedVelocity,
                };
            }
        )
        setBalls(updatedBalls);
    }

    const resetBalls = (newSettings) => {
        setBalls(setupBalls(newSettings));
    }

    return [balls, updateBalls, resetBalls];
}