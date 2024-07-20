import {createContext, useContext} from "react";
import {useSettings} from "/src/hooks/useSettings.jsx";

export const SettingsContext = createContext();

export const SettingsProvider = ({children}) => {
    const [settings, updateSettings] = useSettings();
    return (
        <SettingsContext.Provider value={{settings, updateSettings}}>
            {children}
        </SettingsContext.Provider>
    )
}

export function useSettingsContext() {
    const context = useContext(SettingsContext);
    if (!context) {
        throw new Error('useSettingsContext must be used within a SettingsProvider');
    }
    return context;
}
