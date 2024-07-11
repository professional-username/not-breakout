import "./Game.css"
import {useEffect} from "react"
import {useEnvironment} from "/src/hooks/useEnvironment";
import {useBalls} from "/src/hooks/useBalls";
import {useBlocks} from "/src/hooks/useBlocks";
import Blocks from "/src/components/Blocks/Blocks";
import Balls from "/src/components/Balls/Balls";


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
        <div className="gameBoard" style={{height: environment.size * 2, width: environment.size * 2}}>
            <Blocks blocks={blocks}/>
            <Balls balls={balls}/>
        </div>
    )
}

export default Game