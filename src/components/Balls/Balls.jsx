import "./Balls.scss";

function Balls({ balls }) {
    return (
        <div className="balls">
            {balls.map((ball, index) => (
                <Ball key={index} {...ball} />
            ))}
        </div>
    );
}

function Ball({ ...ballParams }) {
    return (
        <div
            className={`ball color-${ballParams.color}`}
            style={{
                translate: `${ballParams.position[0]}em ${ballParams.position[1]}em`,
                width: `${ballParams.radius * 2}em`,
                height: `${ballParams.radius * 2}em`,
            }}
        />
    );
}

export default Balls;
