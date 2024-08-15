import { useSettingsContext } from "/src/contexts/SettingsContext.jsx";
import ReactSlider from "react-slider";
import "./ValueSlider.scss";

function ValueSlider({ label, valueName, increment, min, max }) {
    const { settings, updateSettings } = useSettingsContext();
    const value = settings[valueName];
    const handleSliderChange = (value) => {
        updateSettings({ [valueName]: value });
    };

    return (
        <div className="value-slider">
            <div className="value-slider__label">{label}</div>
            <div className="value-slider__value">{value}</div>
            <ReactSlider
                className="value-slider__slider"
                marks
                min={min}
                max={max}
                step={increment}
                value={value}
                onChange={handleSliderChange}
            />
        </div>
    );
}

export default ValueSlider;
