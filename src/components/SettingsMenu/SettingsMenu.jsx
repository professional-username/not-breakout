import "./SettingsMenu.scss"
import {SettingsProvider, useSettingsContext} from "../../contexts/SettingsContext.jsx";

function IncrementButton({label, valueName, increment = 1}) {
    const {settings, updateSettings} = useSettingsContext();
    const value = settings[valueName];

    return (
        <div className={"incrementButton"}>
            <button
                onClick={() => updateSettings({[valueName]: value - increment})}
            >
                -
            </button>
            <div>{label}: {value.toFixed(2)}</div>
            <button
                onClick={() => updateSettings({[valueName]: value + increment})}
            >
                +
            </button>
        </div>
    )
}

function ReloadButton({updateSettings}) {
    const {settings: privateSettings} = useSettingsContext();
    return (
        <button
            onClick={() => updateSettings(privateSettings)}
        >
            Reload
        </button>
    )
}

function SettingsMenu({reloadSettings}) {
    return (
        <div className="settingsMenu">
            {/*Some settings are updated locally, then synced together with a button*/}
            <SettingsProvider>
                <IncrementButton label="Colors" valueName="nColors"/>
                <IncrementButton label="Balls" valueName="nBallsPerColor"/>
                <ReloadButton updateSettings={reloadSettings}/>
            </SettingsProvider>
            <IncrementButton label="Gravity" valueName="gravity" increment={0.1}/>
        </div>
    )
}

export default SettingsMenu