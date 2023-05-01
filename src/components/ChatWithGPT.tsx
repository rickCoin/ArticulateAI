import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import UserInputForm from "./UserInputForm";
import AIResponseSection from "./AIResponseSection";
import { createUser, updateUser, checkUserInDoc } from "@/firebase/fireStore";
import { auth } from "@/firebase/firebaseClient";

interface ChatWithGPTProps {
    userID: string;
}

const ChatWithGPT: React.FC<ChatWithGPTProps> = ({ userID }) => {
    const [userInput, setUserInput] = useState("");
    const [generatedText, setGeneratedText] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setUserInput(event.target.value);
    };

    const getResponse = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post("/api/gpt", {
                prompt: userInput,
            });
            const newGeneratedText = response.data.generatedText;
            setGeneratedText(newGeneratedText);
            console.log(generatedText);
            console.log("----- add to db");

            if (await checkUserInDoc(userID)) {
                updateUser(userID, userInput, newGeneratedText);
            } else {
                createUser(userID, userInput, newGeneratedText);
            }

            setLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 ml-10 mr-10">
            <UserInputForm
                userInput={userInput}
                handleChange={handleChange}
                getResponse={getResponse}
            />
            <AIResponseSection aiResponse={generatedText} loading={loading} />
        </div>
    );
};

export default ChatWithGPT;
