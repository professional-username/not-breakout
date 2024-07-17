import "./SettingsMenu.scss"

function SettingsMenu({settings, updateSetting}) {
    return (
        <div className="settingsMenu">
            <p>Size: {settings.envSize}</p>
            <p>blockSize: {settings.blockSize}</p>
            <p>Balls per Color: {settings.nBallsPerColor}</p>
            <p>Ball Radius: {settings.ballRadius}</p>
            <p>nColors: {settings.nColors}</p>
        </div>
    )
}

export default SettingsMenu