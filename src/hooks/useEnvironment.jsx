import {useState} from "react";

export function useEnvironment() {
    const [environment, setEnvironment] = useState({
        envSize: 400, // Side length
        blockSize: 20, // Side length
        ballSize: 10, // Diameter
        nBalls: 3,
        nColours: 2,
    });
    return environment;
}
