import "./BorderOverlay.scss";

function Borders({ blocks }) {
    return (
        <div className="borders">
            {blocks.map((blockParams) => (
                <BorderBlock key={blockParams.id} {...blockParams} />
            ))}
        </div>
    );
}

function BorderBlock({ ...blockParams }) {
    const borderWidth = blockParams.size * 0.05;
    return (
        <div
            className="border"
            style={{
                translate: `${blockParams.position.x}em ${blockParams.position.y}em`,
                width: `${blockParams.size}em`,
                height: `${blockParams.size}em`,

                borderLeft: blockParams.borders.left
                    ? `${borderWidth}em solid var(--border-color)`
                    : `${borderWidth}em solid transparent`,
                borderTop: blockParams.borders.top
                    ? `${borderWidth}em solid var(--border-color)`
                    : `${borderWidth}em solid transparent`,
                borderRight: blockParams.borders.right
                    ? `${borderWidth}em solid var(--border-color)`
                    : `${borderWidth}em solid transparent`,
                borderBottom: blockParams.borders.bottom
                    ? `${borderWidth}em solid var(--border-color)`
                    : `${borderWidth}em solid transparent`,
            }}
        />
    );
}

export default Borders;
