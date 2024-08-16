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

// Some settings are derived from others
const settingDependencies = {
    envSize: (settings) => {
        const { blocksPerSide, blockSize } = settings;
        if (blocksPerSide === undefined || blockSize === undefined) {
            return NaN;
        }
        return blocksPerSide * blockSize;
    },
};

// We generate the dependant settings by iterating over the dependencies
const generateDependantSettings = (settings) => {
    var dependantSettings = {};
    for (const s in settingDependencies) {
        console.log(s);
        const depSetting = settingDependencies[s](settings);
        if (depSetting !== NaN) {
            dependantSettings[s] = depSetting;
        }
    }
    return dependantSettings;
};

export function useSettings(initialSettings = defaultSettings) {
    const fullInitialSettings = {
        ...initialSettings,
        ...generateDependantSettings(initialSettings),
    };
    const [settings, setSettings] = useState(fullInitialSettings);

    const updateSettings = useCallback((newSettings) => {
        setSettings((prevSettings) => {
            // Combine the old settings with the new
            const newCombinedSettings = {
                ...prevSettings,
                ...newSettings,
            };
            // Generate the dependant settings
            const newDependantSettings =
                generateDependantSettings(newCombinedSettings);
            // Add the dependant settings on
            return {
                ...newCombinedSettings,
                ...newDependantSettings,
            };
        });
    });

    return [settings, updateSettings];
}
