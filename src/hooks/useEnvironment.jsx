import {useState} from "react";

export function useEnvironment() {
    const [environment, setEnvironment] = useState({
        envSize: 499, // Side length
        blockSize: 20, // Side length
        ballRadius: 6,
        nColors: 4,
        nBallsPerColor: 3,
    });
    return environment;
}
