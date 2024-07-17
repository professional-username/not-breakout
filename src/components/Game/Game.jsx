import "./Game.scss"
import {useEffect} from "react"
import {useEnvironment} from "/src/hooks/useEnvironment";
import {useBalls} from "/src/hooks/useBalls";
import {useBlocks} from "/src/hooks/useBlocks";
import Blocks from "/src/components/Blocks/Blocks";
import Balls from "/src/components/Balls/Balls";
import Borders from "/src/components/BorderOverlay/BorderOverlay";


function Game() {

    const environment = useEnvironment();
    const [balls, updateBalls] = useBalls(environment);
    const [blocks, updateBlocks] = useBlocks(environment);

    useEffect(() => {
        const interval = setInterval(() => {
            updateBalls(blocks);
            updateBlocks(balls);
        }, 10);
        return () => clearInterval(interval);
    }, [balls, blocks, updateBalls, updateBlocks]);

    return (
        <div className="gameBoard" style={{height: environment.envSize, width: environment.envSize}}>
            <Blocks blocks={blocks}/>
            <Borders blocks={blocks}/>
            <Balls balls={balls}/>
        </div>
    )
}

export default Game