import React, { useState } from "react";
import Button from "./Button";

interface AIResponseSectionProps {
    aiResponse: string;
    loading: boolean;
}

const AIResponseSection: React.FC<AIResponseSectionProps> = ({
    aiResponse,
    loading,
}) => {
    const handleCopy = async () => {
        try {
            const splitResponse = aiResponse.split("\n");
            const targetResponse = splitResponse[splitResponse.length - 1];
            console.log("targetResponse", targetResponse);

            await navigator.clipboard.writeText(targetResponse.trim());
            alert("Copied to clipboard!");
        } catch (err) {
            console.error("Failed to copy text: ", err);
        }
    };

    return (
        <div className="flex flex-col items-center mt-4 mb-4 outline outline-offset-2  outline-yellow-light rounded-2xl">
            <h2 className="bg-transparent text-xl text-yellow-light font-bold mt-4 mb-4">
                Output:
            </h2>
            {loading ? (
                <div className="mt-auto mb-auto animate-spin rounded-full h-10 w-10 border-t-4 border-b-10 border-yellow-light"></div>
            ) : (
                <textarea
                    id="ai-response"
                    value={aiResponse}
                    readOnly
                    className="bg-transparent rounded-xl  text-justify w-full h-full p-4 text-yellow-light text-xl focus:outline-none"
                />
            )}
            <Button
                onClick={handleCopy}
                text="Copy"
                className="border bg-transparent text-white mt-4 mb-4 py-2 px-4 rounded-2xl self-center hover:bg-yellow-light"
                disabled={loading} // Disable the button when isLoading is true
            />
        </div>
    );
};

export default AIResponseSection;
