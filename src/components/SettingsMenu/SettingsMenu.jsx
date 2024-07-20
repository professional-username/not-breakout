import "./SettingsMenu.scss"
import {useSettings} from "../../hooks/useSettings.jsx";
import {useSettingsContext} from "../../contexts/SettingsContext.jsx";

function IncrementButton({label, value, valueName, updateSettings}) {
    return (
        <div className={"incrementButton"}>
            <button
                onClick={() => updateSettings({[valueName]: value - 1})}
            >
                -
            </button>
            <div>{label}: {value}</div>
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

function SettingsMenu({reloadSettings}) {
    const {settings} = useSettingsContext();
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