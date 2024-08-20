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
            <footer>
                <a href="https://github.com/professional-username/not-breakout">
                    Source
                </a>
                {" | "}
                <a href="https://pong-wars.vercel.app/">Inspiration</a>
            </footer>
        </div>
    );
}

export default App;
