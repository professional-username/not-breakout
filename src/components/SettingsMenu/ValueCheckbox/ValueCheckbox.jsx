import { useSettingsContext } from "/src/contexts/SettingsContext.jsx";
import "./ValueCheckbox.scss";

function ValueCheckbox({ label, valueName }) {
    const { settings, updateSettings } = useSettingsContext();
    const value = settings[valueName];

    return (
        <div className="value-checkbox">
            <div className="value-checkbox__label">{label}</div>
            <input
                className="value-checkbox__checkbox"
                type="checkbox"
                checked={value}
                onChange={() => updateSettings({ [valueName]: !value })}
            />
        </div>
    );
}

export default ValueCheckbox;
