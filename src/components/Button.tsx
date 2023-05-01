import React from "react";

interface ButtonProps {
    text: string;
    onClick?: () => void;
    className?: string;
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({
    text,
    onClick,
    className = "",
    disabled = false,
    type = "button",
}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`${className} py-2 px-4 rounded transition-colors duration-200 ease-in`}
            disabled={disabled}
        >
            {text}
        </button>
    );
};

export default Button;
