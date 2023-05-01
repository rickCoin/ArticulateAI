import React, { ChangeEvent, FormEvent } from "react";
import Button from "./Button";

interface UserInputFormProps {
    userInput: string;
    handleChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
    getResponse: (event: FormEvent<HTMLFormElement>) => void;
}

const UserInputForm: React.FC<UserInputFormProps> = ({
    userInput,
    handleChange,
    getResponse,
}) => {
    return (
        <div className="flex flex-col items-center mt-4 mb-4 outline outline-offset-2  outline-[#9b4f1f] rounded-2xl ">
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
