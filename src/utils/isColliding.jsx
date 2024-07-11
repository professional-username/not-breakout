export function isColliding(ball, block) {
    const ballRadius = 6; // Assume ball radius
    const blockHalfSize = block.size / 2;

    const distX = Math.abs(ball.position[0] - block.position.x) - ballRadius;
    const distY = Math.abs(ball.position[1] - block.position.y) - ballRadius;

    return (distX <= blockHalfSize && distY <= blockHalfSize)
}