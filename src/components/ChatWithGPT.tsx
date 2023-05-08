import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import UserInputForm from "./UserInputForm";
import AIResponseSection from "./AIResponseSection";
import { setPhotographicPrompt, setGeneralPrompt } from "@/firebase/fireStore";
import Button from "./Button";
import openai from "@/api/openai";
import { GENERAL_MODE, PHOTOGRAPHIC_MODE } from "@/constants/api";

interface ChatWithGPTProps {
    userID: string;
}

const ChatWithGPT: React.FC<ChatWithGPTProps> = ({ userID }) => {
    const [userInput, setUserInput] = useState("");
    const [generatedText, setGeneratedText] = useState("");
    const [loading, setLoading] = useState(false);
    const [mode, setMode] = useState(GENERAL_MODE);

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setUserInput(event.target.value);
    };
    const toggleAPI = () => {
        setMode((prevMode) =>
            prevMode === GENERAL_MODE ? PHOTOGRAPHIC_MODE : GENERAL_MODE
        );
        console.log(mode);
    };
    const getResponse = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);

        try {
            let response = null;
            if (mode === GENERAL_MODE) {
                response = await openai.generalApiCall(userInput);
                const newGeneratedText = response.generatedText;
                setGeneratedText(newGeneratedText);
                await setGeneralPrompt(userID, userInput, newGeneratedText);
            } else {
                response = await openai.photographicApiCall(userInput);
                const newGeneratedText = response.generatedText;
                setGeneratedText(newGeneratedText);
                await setPhotographicPrompt(
                    userID,
                    userInput,
                    newGeneratedText
                );
            }
            setLoading(false);
        } catch (error) {
            console.error(error);
            setGeneratedText("report error");
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="flex justify-center mb-4"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 ml-10 mr-10">
                <UserInputForm
                    userInput={userInput}
                    handleChange={handleChange}
                    getResponse={getResponse}
                />

                <AIResponseSection
                    aiResponse={generatedText}
                    loading={loading}
                    toggleAPI={toggleAPI}
                    mode={mode}
                ></AIResponseSection>
            </div>
        </div>
    );
};

export default ChatWithGPT;
