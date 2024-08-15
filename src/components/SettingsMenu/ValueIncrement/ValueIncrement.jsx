import { useSettingsContext } from "/src/contexts/SettingsContext.jsx";
import "./ValueIncrement.scss";

function ValueIncrement({ label, valueName, increment = 1, min, max }) {
    const { settings, updateSettings } = useSettingsContext();
    const value = settings[valueName];

    return (
        <div className={"settings-menu__increment"}>
            <button
                onClick={() =>
                    updateSettings({ [valueName]: value - increment })
                }
            >
                -
            </button>
            <div>
                {label}: {value.toFixed(2)}
            </div>
            <button
                onClick={() =>
                    updateSettings({ [valueName]: value + increment })
                }
            >
                +
            </button>
        </div>
    );
}

export default ValueIncrement;
