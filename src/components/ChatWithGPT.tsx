import React, { useState, ChangeEvent, FormEvent } from "react";
import UserInputForm from "./UserInputForm";
import AIResponseSection from "./AIResponseSection";
import {
    setPhotographicPrompt,
    setGenerateV2Prompt,
    setAnimePrompt,
} from "@/firebase/fireStore";

import openai from "@/api/openai";
import { ANIME_MODE, GENERAL_MODE_V2 } from "@/constants/api";

interface ChatWithGPTProps {
    userID: string;
}

const ChatWithGPT: React.FC<ChatWithGPTProps> = ({ userID }) => {
    const [userInput, setUserInput] = useState("");
    const [generatedText, setGeneratedText] = useState("");
    const [loading, setLoading] = useState(false);
    const [mode, setMode] = useState(GENERAL_MODE_V2);

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setUserInput(event.target.value);
    };
    const toggleAPI = (prevMode: any) => {
        setMode(prevMode);
        console.log(prevMode);
    };
    const getResponse = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);

        try {
            let response = null;
            switch (mode) {
                case GENERAL_MODE_V2:
                    response = await openai.generalV2ApiCall(userInput);
                    await setGenerateV2Prompt(
                        userID,
                        userInput,
                        response.generatedText
                    );
                    break;

                case ANIME_MODE:
                    response = await openai.animeApiCall(userInput);
                    await setAnimePrompt(
                        userID,
                        userInput,
                        response.generatedText
                    );
                    break;

                default:
                    response = await openai.photographyApiCall(userInput);
                    await setPhotographicPrompt(
                        userID,
                        userInput,
                        response.generatedText
                    );
                    break;
            }

            setGeneratedText(response.generatedText);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setGeneratedText("Timeout, Pleas retry");
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="flex justify-center mb-4"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 px-10 min-w-screen-sm">
                <UserInputForm
                    userInput={userInput}
                    handleChange={handleChange}
                    getResponse={getResponse}
                    toggleAPI={toggleAPI}
                    mode={mode}
                />

                <AIResponseSection
                    aiResponse={generatedText}
                    loading={loading}
                ></AIResponseSection>
            </div>
        </div>
    );
};

export default ChatWithGPT;
