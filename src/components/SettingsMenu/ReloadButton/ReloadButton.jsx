import { useSettingsContext } from "/src/contexts/SettingsContext.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRefresh } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import "./ReloadButton.scss";

function ReloadButton({ updateSettings }) {
    const { settings: privateSettings } = useSettingsContext();

    // Make the button pop a bit when pressed
    const [buttonActive, setButtonActive] = useState();
    const handleClick = () => {
        // Update the global settings with the private ones
        updateSettings(privateSettings);
        // Set and reset the button active state
        setButtonActive(true);
        setTimeout(() => {
            setButtonActive(false);
        }, 200);
    };

    return (
        <div className="reload-button">
            <button
                className={`
                    reload-button__button
                    reload-button__button--${buttonActive ? "active" : "inactive"}
                `}
                onClick={() => handleClick()}
            >
                <FontAwesomeIcon
                    className="reload-button__icon"
                    icon={faRefresh}
                />
            </button>
        </div>
    );
}

export default ReloadButton;
