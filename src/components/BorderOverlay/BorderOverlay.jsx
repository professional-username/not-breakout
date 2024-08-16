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
    return (
        <div
            className="border"
            style={{
                translate: `${blockParams.position.x}em ${blockParams.position.y}em`,
                width: `${blockParams.size}em`,
                height: `${blockParams.size}em`,

                borderLeft: blockParams.borders.left
                    ? "1em solid var(--border-color)"
                    : "1em solid transparent",
                borderTop: blockParams.borders.top
                    ? "1em solid var(--border-color)"
                    : "1em solid transparent",
                borderRight: blockParams.borders.right
                    ? "1em solid var(--border-color)"
                    : "1em solid transparent",
                borderBottom: blockParams.borders.bottom
                    ? "1em solid var(--border-color)"
                    : "1em solid transparent",
            }}
        />
    );
}

export default Borders;
