import {useState} from "react";

export function useSettings() {
    const [settings, setSettings] = useState({
        envSize: 399, // Side length
        blockSize: 20, // Side length
        ballRadius: 7,
        nColors: 4,
        nBallsPerColor: 2,
    });

    const updateSetting = (key, value) => {
        setSettings({...settings, [key]: value});
    }

    return [settings, updateSetting];
}
