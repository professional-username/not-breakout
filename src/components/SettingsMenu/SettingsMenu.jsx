import ValueSlider from "./ValueSlider/ValueSlider";
import ValueCheckbox from "./ValueCheckbox/ValueCheckbox";
import ReloadButton from "./ReloadButton/ReloadButton";
import { SettingsProvider } from "../../contexts/SettingsContext.jsx";
import "./SettingsMenu.scss";
import { memo } from "react";

const SettingsMenu = memo(({ reloadSettings }) => {
    console.log("reloading settings menu");
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

                <ValueSlider
                    label="Ball Radius"
                    valueName="ballRadius"
                    min={1}
                    max={10}
                    increment={1}
                />

                <ValueSlider
                    label="Block Size"
                    valueName="blockSize"
                    min={20}
                    max={30}
                    increment={5}
                />

                <ValueSlider
                    label="Board Size"
                    valueName="blocksPerSide"
                    min={10}
                    max={25}
                    increment={1}
                />

                <ValueCheckbox label="Walls" valueName="enableBorders" />

                <ReloadButton updateSettings={reloadSettings} />
            </SettingsProvider>
        </div>
    );
});

export default SettingsMenu;
