import {useState} from "react";

export function useEnvironment() {
    const [environment, setEnvironment] = useState({
        envSize: 399, // Side length
        blockSize: 20, // Side length
        ballRadius: 7,
        nColors: 4,
        nBallsPerColor: 2,
    });
    return environment;
}
