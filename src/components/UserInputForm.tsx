import React, { ChangeEvent, FormEvent } from "react";
import Button from "./Button";
import { GENERAL_MODE_V2, PHOTOGRAPHY_MODE, ANIME_MODE } from "@/constants/api";

interface UserInputFormProps {
    userInput: string;
    handleChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
    getResponse: (event: FormEvent<HTMLFormElement>) => void;
    toggleAPI: (mode: string) => void;
    mode: string;
}

const UserInputForm: React.FC<UserInputFormProps> = ({
    userInput,
    handleChange,
    getResponse,
    toggleAPI,
    mode,
}) => {
    return (
        <div className="flex flex-col items-center mt-4 mb-4 outline outline-offset-2  outline-yellow-dark rounded-2xl ">
            <div className="flex gap-1 px-32">
                <Button
                    className={`border text-white mt-4 mb-4 text-sm sm:text-xl rounded-2xl ${
                        mode === GENERAL_MODE_V2
                            ? "bg-yellow-dark"
                            : "bg-transparent"
                    } whitespace-nowrap`}
                    text="General"
                    onClick={() => toggleAPI(GENERAL_MODE_V2)}
                />
                <Button
                    className={`border text-white text-sm sm:text-xl mt-4 mb-4 rounded-2xl ${
                        mode === PHOTOGRAPHY_MODE
                            ? "bg-yellow-dark"
                            : "bg-transparent"
                    } whitespace-nowrap`}
                    text="Photography"
                    onClick={() => toggleAPI(PHOTOGRAPHY_MODE)}
                />
                <Button
                    className={`border text-white mt-4 mb-4 text-sm sm:text-xl rounded-2xl ${
                        mode === ANIME_MODE
                            ? "bg-yellow-dark"
                            : "bg-transparent"
                    } whitespace-nowrap`}
                    text="Anime"
                    onClick={() => toggleAPI(ANIME_MODE)}
                />
            </div>

            <form onSubmit={getResponse} className="w-full h-full">
                <div className="flex flex-col">
                    <textarea
                        className="bg-transparent rounded-xl w-auto h-auto p-10 lg:p-20 text-xl lg:text-2xl text-[#9b4f1f]  focus:outline-none"
                        value={userInput}
                        onChange={handleChange}
                        placeholder="Type your vision here."
                    />
                    <Button
                        className="border bg-transparent text-white mt-4 mb-4 py-2 px-4 rounded-2xl self-center hover:bg-yellow-dark"
                        text="Send"
                        type="submit"
                    />
                </div>
            </form>
        </div>
    );
};

export default UserInputForm;
