import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import "./MoreSettingsButton.scss";

function MoreSettingsButton({ children }) {
    const [openState, setOpenState] = useState(false);
    // Toggled with a click to force the menu to _stay_ open
    const [openAnchor, setOpenAnchor] = useState(false);

    const handleClick = () => {
        setOpenAnchor((previousState) => !previousState);
        setOpenState(openAnchor);
    };

    const handleHoverEnter = () => {
        setOpenState(true);
    };

    const handleHoverLeave = () => {
        setOpenState(openAnchor ? true : false);
    };

    return (
        <div
            className="more-settings"
            onMouseEnter={() => handleHoverEnter()}
            onMouseLeave={() => handleHoverLeave()}
        >
            <div
                className={`
                    more-settings__content
                    more-settings__content--${openState ? "open" : "closed"}
                `}
            >
                {children}
            </div>
            <button
                className={`
                    more-settings__button
                    more-settings__button--${openAnchor ? "open" : "closed"}
                `}
                onClick={() => handleClick()}
            >
                <FontAwesomeIcon
                    className={`
                        more-settings__button-icon
                        more-settings__button-icon--${openAnchor ? "open" : "closed"}
                    `}
                    icon={faArrowDown}
                />
            </button>
        </div>
    );
}

export default MoreSettingsButton;
