import {useState} from "react";

export function useEnvironment() {
    const [environment, setEnvironment] = useState({
        size: 200,
        nBalls: 3,
        ballSize: 6,
        nBlocks: 20, // Per side
    });
    return environment;
}
