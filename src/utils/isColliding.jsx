export function isColliding(ball, block) {
    // Check colors
    if (ball.color === block.color) {
        return false;
    }

    const distX = Math.abs(ball.position[0] - block.position.x);
    const distY = Math.abs(ball.position[1] - block.position.y);

    const ballRadius = ball.radius;
    const blockHalfSize = block.size / 2;

    return (distX <= blockHalfSize + ballRadius && distY <= blockHalfSize + ballRadius)
}