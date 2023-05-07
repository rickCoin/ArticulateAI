import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import UserInputForm from "./UserInputForm";
import AIResponseSection from "./AIResponseSection";
import { setPhotographicPrompt, setGeneralPrompt } from "@/firebase/fireStore";
import Button from "./Button";

interface ChatWithGPTProps {
    userID: string;
}

const ChatWithGPT: React.FC<ChatWithGPTProps> = ({ userID }) => {
    const [userInput, setUserInput] = useState("");
    const [generatedText, setGeneratedText] = useState("");
    const [loading, setLoading] = useState(false);
    const [apiPath, setApiPath] = useState("/api/gpt");

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setUserInput(event.target.value);
    };
    const toggleAPI = () => {
        setApiPath((prevApiPath) =>
            prevApiPath === "/api/gpt" ? "/api/photographic" : "/api/gpt"
        );
    };
    const getResponse = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post(apiPath, {
                prompt: userInput,
            });
            const newGeneratedText = response.data.generatedText;
            setGeneratedText(newGeneratedText);
            console.log(generatedText);
            console.log("----- add to db");
            console.log("user id: ", userID);

            if (apiPath === "/api/gpt") {
                await setGeneralPrompt(userID, userInput, newGeneratedText);
            } else if (apiPath === "/api/photographic") {
                await setPhotographicPrompt(
                    userID,
                    userInput,
                    newGeneratedText
                );
            }
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <div className="flex justify-center mb-4">
                <Button
                    className="border bg-transparent text-white mt-4 mb-4 py-2 px-4 rounded-2xl self-center hover:bg-blue-light"
                    text={
                        apiPath === "/api/gpt"
                            ? "Switch to Photographic mode"
                            : "Switch to General mode"
                    }
                    onClick={toggleAPI}
                />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 ml-10 mr-10">
                <UserInputForm
                    userInput={userInput}
                    handleChange={handleChange}
                    getResponse={getResponse}
                />
                <AIResponseSection
                    aiResponse={generatedText}
                    loading={loading}
                />
            </div>
        </div>
    );
};

export default ChatWithGPT;
