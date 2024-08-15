import { useSettingsContext } from "/src/contexts/SettingsContext.jsx";
import "./ValueCheckbox.scss";

function ValueCheckbox({ label, valueName }) {
    const { settings, updateSettings } = useSettingsContext();
    const value = settings[valueName];

    return (
        <div className="value-checkbox">
            <div className="value-checkbox__label">{label}</div>

            <input
                id={`checkbox-${valueName}`}
                className="value-checkbox__checkbox"
                type="checkbox"
                checked={value}
                onChange={() => updateSettings({ [valueName]: !value })}
            />

            <label
                htmlFor={`checkbox-${valueName}`}
                className="value-checkbox__pill"
            >
                <div className="value-checkbox__pill-knob"></div>
            </label>
        </div>
    );
}

export default ValueCheckbox;
