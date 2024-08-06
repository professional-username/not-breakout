import "./SettingsMenu.scss";
import {SettingsProvider, useSettingsContext} from "../../contexts/SettingsContext.jsx";
import ReactSlider from "react-slider";

function ValueSlider({label, valueName, increment, min, max}) {
    const {settings, updateSettings} = useSettingsContext();
    const value = settings[valueName];
    const handleSliderChange = (value) => {
        // console.log(value)
        updateSettings({[valueName]: value});
    }

    return (
        <ReactSlider
            className="settings-menu__slider"
            marks
            min={min}
            max={max}
            step={increment}
            value={value}
            onChange={handleSliderChange}
        />
    )
}

function ValueCheckbox({label, valueName}) {
    const {settings, updateSettings} = useSettingsContext();
    const value = settings[valueName];

    return (
        <label>
            <input
                type="checkbox"
                checked={value}
                onChange={() => updateSettings({[valueName]: !value})}
            />
            {label}
        </label>
    )
}

function IncrementButton({label, valueName, increment = 1, min, max}) {
    const {settings, updateSettings} = useSettingsContext();
    const value = settings[valueName];

    return (
        <div className={"settings-menu__increment"}>
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
        <div className="settings-menu">
            {/*Some settings are updated locally, then synced together with a button*/}
            <SettingsProvider>
                <IncrementButton label="Colors" valueName="nColors"/>
                <IncrementButton label="Balls" valueName="nBallsPerColor"/>
                <ReloadButton updateSettings={reloadSettings}/>
            </SettingsProvider>
            <IncrementButton label="Gravity" valueName="gravity" increment={0.1}/>
            <ValueSlider label="Gravity" valueName="gravity" min={-1} max={1} increment={0.1}/>
            <ValueCheckbox label="Walls" valueName="enableBorders"/>
        </div>
    )
}

export default SettingsMenu