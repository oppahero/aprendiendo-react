import { useState } from "react";
import "./App.css";

// formatUserName callback que recibiamo anteriormente

export function TwitterFollowCard({ userName = "unkown", name, initialIsFollowing }) {
    // const addAt = (userName) => `@${userName}`

    const [isFollowing, setIsFollowing] = useState(initialIsFollowing);

    const text = isFollowing ? "Siguiendo" : "Seguir";
    const buttonClassName = isFollowing
        ? "tw-followCard-button is-following"
        : "tw-followCard-button";

    const handleClick = () => {
        setIsFollowing(!isFollowing);
    };

    return (
        <article className="tw-followCard">
            <header className="tw-followCard-header">
                <img
                    className="tw-followCard-avatar"
                    alt="avatar"
                    src={`https://unavatar.io/twitter/${userName}`}
                />
                <div className="tw-followCard-info">
                    <strong>{name}</strong>
                    <span className="tw-followCard-infoUserName">@{userName}</span>
                    {/* <span className="tw-followCard-infoUserName">{formatUserName(userName)}</span> */}
                </div>
            </header>
            <aside>
                <button className={buttonClassName} onClick={handleClick}>
                    <span className="tw-followCard-text">{text}</span>
                    <span className="tw-followCard-stopFollow">Dejar de seguir</span>
                </button>
            </aside>
        </article>
    );
}
