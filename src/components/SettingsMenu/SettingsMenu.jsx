import "./SettingsMenu.scss"

function IncrementButton({label, value, valueName, updateSetting}) {
    return (
        <div className={"incrementButton"}>
            <button
                onClick={() => updateSetting(valueName, value - 1)}
            >
                -
            </button>
            <div>{label}</div>
            <button
                onClick={() => updateSetting(valueName, value + 1)}
            >
                +
            </button>
        </div>
    )
}

function ReloadButton() {
    return (
        <button
            onClick={() => window.location.reload()}
        >
            Reload
        </button>
    )
}

function SettingsMenu({settings, updateSetting}) {
    return (
        <div className="settingsMenu">
            <p>Size: {settings.envSize}</p>
            <p>blockSize: {settings.blockSize}</p>
            <p>Balls per Color: {settings.nBallsPerColor}</p>
            <p>Ball Radius: {settings.ballRadius}</p>
            <IncrementButton label="Colors" value={settings.nColors} valueName="nColors" updateSetting={updateSetting}/>

        </div>
    )
}

export default SettingsMenu