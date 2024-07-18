import {useCallback, useState} from "react";

const defaultSettings = {
    envSize: 399, // Side length
    blockSize: 20, // Side length
    ballRadius: 7,
    nColors: 4,
    nBallsPerColor: 2,
}

export function useSettings(initialSettings = defaultSettings) {
    const [settings, setSettings] = useState(initialSettings);

    const updateSettings = useCallback((newSettings) => {
        setSettings((prevSettings) => ({
            ...prevSettings,
            ...newSettings,
        }));
    });

    return [settings, updateSettings];
}
