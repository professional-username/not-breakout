import "./Game.scss";
import { useEffect } from "react";
import { useSettingsContext } from "/src/contexts/SettingsContext";
import { useBalls } from "/src/hooks/useBalls";
import { useBlocks } from "/src/hooks/useBlocks";
import Blocks from "/src/components/Blocks/Blocks";
import Balls from "/src/components/Balls/Balls";
import Borders from "/src/components/BorderOverlay/BorderOverlay";
import GameData from "../GameData/GameData.jsx";
import SettingsMenu from "../SettingsMenu/SettingsMenu.jsx";

function Game() {
    const { settings, updateSettings } = useSettingsContext();
    const [balls, updateBalls, resetBalls] = useBalls();
    const [blocks, updateBlocks, resetBlocks] = useBlocks();

    // A function to reload the settings and reset the game using them
    const reloadSettings = (newSettings) => {
        updateSettings(newSettings);
        resetBalls(newSettings);
        resetBlocks(newSettings);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            updateBalls(blocks);
            updateBlocks(balls);
        }, 10);
        return () => clearInterval(interval);
    }, [settings, balls, blocks, updateBalls, updateBlocks]);

    return (
        <div className="dashboard">
            <div className="sidePanel">
                <GameData Balls={balls} Blocks={blocks} />
            </div>
            <div
                className="gameBoard"
                style={{ fontSize: 500 / settings.envSize }}
            >
                <Blocks blocks={blocks} />
                <Borders blocks={blocks} />
                <Balls balls={balls} />
            </div>
            <div className="sidePanel">
                <SettingsMenu reloadSettings={reloadSettings} />
            </div>
        </div>
    );
}

export default Game;
