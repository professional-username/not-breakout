import {useState} from "react";

export function useEnvironment() {
    const [environment, setEnvironment] = useState({
        envSize: 499, // Side length
        blockSize: 20, // Side length
        ballSize: 10, // Diameter
        nColors: 4,
        nBallsPerColor: 3,
    });
    return environment;
}
