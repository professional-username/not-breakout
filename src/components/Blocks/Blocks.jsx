import "./Blocks.scss";

function Blocks({ blocks }) {
    return (
        <div className="blocks">
            {blocks.map((blockParams) => (
                <Block key={blockParams.id} {...blockParams} />
            ))}
        </div>
    );
}

function Block({ ...blockParams }) {
    return (
        <div
            className={`block color-${blockParams.color}`}
            style={{
                translate: `${blockParams.position.x}em ${blockParams.position.y}em`,
                width: `${blockParams.size}em`,
                height: `${blockParams.size}em`,
            }}
        />
    );
}

export default Blocks;
