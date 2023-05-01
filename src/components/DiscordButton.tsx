import React from "react";
import { BsDiscord } from "react-icons/bs";

interface DiscordButtonProps {
    className?: string;
}

const DiscordButton: React.FC<DiscordButtonProps> = ({ className = "" }) => {
    const discordInviteLink =
        "https://discord.com/channels/1101807682962329640/1101807682962329643";

    const redirectToDiscord = () => {
        window.open(discordInviteLink, "_blank");
    };

    return (
        <button
            onClick={redirectToDiscord}
            className={`${className} text-yellow-light`}
        >
            <BsDiscord />
        </button>
    );
};

export default DiscordButton;
