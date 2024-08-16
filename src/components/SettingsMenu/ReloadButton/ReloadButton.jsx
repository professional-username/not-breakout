import { useSettingsContext } from "/src/contexts/SettingsContext.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRefresh } from "@fortawesome/free-solid-svg-icons";
import "./ReloadButton.scss";

function ReloadButton({ updateSettings }) {
    const { settings: privateSettings } = useSettingsContext();
    return (
        <div className="reload-button">
            <button
                className="reload-button__button"
                onClick={() => updateSettings(privateSettings)}
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
