import { useCallback, useState } from "react";

const defaultSettings = {
    envSize: 500,
    blocksPerSide: 25,
    blockSize: 20, // Side length
    ballRadius: 7,
    nColors: 4,
    nBallsPerColor: 2,
    gravity: 0,
    enableBorders: true,
};

const settingDependencies = {
    envSize: (settings) => {
        const { blocksPerSide, blockSize } = settings;
        if (blocksPerSide === undefined || blockSize === undefined) {
            return NaN;
        }
        return blocksPerSide * blockSize;
    },
};

const generateDependantSettings = (settings) => {
    var dependantSettings = {};
    for (const s in settingDependencies) {
        console.log(s);
        const depSetting = settingDependencies[s](settings);
        // console.log(new Error().stack);
        if (depSetting !== NaN) {
            dependantSettings[s] = depSetting;
        }
    }
    return dependantSettings;
};

export function useSettings(initialSettings = defaultSettings) {
    // console.log("useSettings hook");
    const [settings, setSettings] = useState(initialSettings);

    const updateSettings = useCallback((newSettings) => {
        // const newDependantSettings = generateDependantSettings(newSettings);
        // console.log(newDependantSettings);
        setSettings((prevSettings) => ({
            // ...newDependantSettings,
            ...prevSettings,
            ...newSettings,
        }));
        console.log(settings);
    });

    return [settings, updateSettings];
}
