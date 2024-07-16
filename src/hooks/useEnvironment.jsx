import {useState} from "react";

export function useEnvironment() {
    const [environment, setEnvironment] = useState({
        envSize: 399, // Side length
        blockSize: 20, // Side length
        ballSize: 10, // Diameter
        nColors: 4,
        nBallsPerColor: 2,
    });
    return environment;
}
