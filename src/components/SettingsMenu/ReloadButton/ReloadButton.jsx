import { useSettingsContext } from "/src/contexts/SettingsContext.jsx";
import "./ReloadButton.scss";

function ReloadButton({ updateSettings }) {
    const { settings: privateSettings } = useSettingsContext();
    return (
        <button onClick={() => updateSettings(privateSettings)}>Reload</button>
    );
}

export default ReloadButton;
