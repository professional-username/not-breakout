import "./App.scss";
import { SettingsProvider } from "../../contexts/SettingsContext.jsx";
import Game from "/src/components/Game/Game";

function App() {
    return (
        <div className="App">
            <header>Not Breakout</header>
            <main>
                <SettingsProvider>
                    <Game />
                </SettingsProvider>
            </main>
            <footer>You opened this can of worms, now lie in it</footer>
        </div>
    );
}

export default App;
