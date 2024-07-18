import "./Game.scss"
import {useEffect} from "react"
import {useSettings} from "/src/hooks/useSettings";
import {useBalls} from "/src/hooks/useBalls";
import {useBlocks} from "/src/hooks/useBlocks";
import Blocks from "/src/components/Blocks/Blocks";
import Balls from "/src/components/Balls/Balls";
import Borders from "/src/components/BorderOverlay/BorderOverlay";
import GameData from "../GameData/GameData.jsx";
import SettingsMenu from "../SettingsMenu/SettingsMenu.jsx";


function Game() {

    const [settings, updateSettings] = useSettings();
    const [balls, updateBalls, resetBalls] = useBalls(settings);
    const [blocks, updateBlocks, resetBlocks] = useBlocks(settings);

    const reloadSettings = (newSettings) => {
        updateSettings(newSettings);
        resetBalls(newSettings);
        resetBlocks(newSettings);
    }

    useEffect(() => {
        const interval = setInterval(() => {
            updateBalls(blocks);
            updateBlocks(balls);
        }, 10);
        return () => clearInterval(interval);
    }, [settings, balls, blocks, updateBalls, updateBlocks]);

    return (
        <div className="dashboard">
            <GameData settings={settings} Balls={balls} Blocks={blocks}/>
            <div className="gameBoard" style={{height: settings.envSize, width: settings.envSize}}>
                <Blocks blocks={blocks}/>
                <Borders blocks={blocks}/>
                <Balls balls={balls}/>
            </div>
            <SettingsMenu settings={settings} reloadSettings={reloadSettings}/>
        </div>
    )
}

export default Game