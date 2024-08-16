import { createContext, useContext, useMemo } from "react";
import { useSettings } from "/src/hooks/useSettings.jsx";

export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
    const [settings, updateSettings] = useSettings();

    // Memoize for efficiency
    const value = useMemo(
        () => ({ settings, updateSettings }),
        [settings, updateSettings],
    );

    return (
        <SettingsContext.Provider value={value}>
            {children}
        </SettingsContext.Provider>
    );
};

export function useSettingsContext() {
    const context = useContext(SettingsContext);
    if (!context) {
        throw new Error(
            "useSettingsContext must be used within a SettingsProvider",
        );
    }
    return context;
}
