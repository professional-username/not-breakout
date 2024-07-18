import "./SettingsMenu.scss"
import {useSettings} from "../../hooks/useSettings.jsx";

function IncrementButton({label, value, valueName, updateSettings}) {
    return (
        <div className={"incrementButton"}>
            <button
                onClick={() => updateSettings({[valueName]: value - 1})}
            >
                -
            </button>
            <div>{label}</div>
            <button
                onClick={() => updateSettings({[valueName]: value + 1})}
            >
                +
            </button>
        </div>
    )
}

function ReloadButton({privateSettings, updateSettings}) {
    return (
        <button
            onClick={() => updateSettings(privateSettings)}
        >
            Reload
        </button>
    )
}

function SettingsMenu({settings, reloadSettings}) {
    const [privateSettings, updatePrivateSettings] = useSettings(settings);

    return (
        <div className="settingsMenu">
            <IncrementButton label="Colors" value={privateSettings.nColors} valueName="nColors"
                             updateSettings={updatePrivateSettings}/>
            <ReloadButton privateSettings={privateSettings} updateSettings={reloadSettings}/>
        </div>
    )
}

export default SettingsMenu