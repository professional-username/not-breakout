import "./App.scss"
import {SettingsProvider} from "../../contexts/SettingsContext.jsx";
import Game from "/src/components/Game/Game"

function App() {
    return (
        <div className="App">
            <h1>Not Breakout</h1>
            <SettingsProvider>
                <Game/>
            </SettingsProvider>
        </div>
    )
}

export default App