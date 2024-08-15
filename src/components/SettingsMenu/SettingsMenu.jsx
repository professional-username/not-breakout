import ValueSlider from "./ValueSlider/ValueSlider";
import ValueCheckbox from "./ValueCheckbox/ValueCheckbox";
import ReloadButton from "./ReloadButton/ReloadButton";
import {
    SettingsProvider,
    useSettingsContext,
} from "../../contexts/SettingsContext.jsx";
import "./SettingsMenu.scss";

function SettingsMenu({ reloadSettings }) {
    return (
        <div className="settings-menu">
            <SettingsProvider>
                <ValueSlider
                    label="Colors"
                    valueName="nColors"
                    min={2}
                    max={6}
                    increment={1}
                />

                <ValueSlider
                    label="Balls"
                    valueName="nBallsPerColor"
                    min={1}
                    max={5}
                    increment={1}
                />

                <ValueSlider
                    label="Gravity"
                    valueName="gravity"
                    min={-1}
                    max={1}
                    increment={0.1}
                />

                <ValueCheckbox label="Walls" valueName="enableBorders" />

                <ReloadButton updateSettings={reloadSettings} />
            </SettingsProvider>
        </div>
    );
}

export default SettingsMenu;
