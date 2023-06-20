import React from "react";
import Button from "./Button";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/firebaseClient";
import DiscordButton from "./DiscordButton";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBook,
    faBookOpen,
    faScissors,
} from "@fortawesome/free-solid-svg-icons";

const Header: React.FC = () => {
    const router = useRouter();

    const handleGoogleLogout = async (): Promise<void> => {
        try {
            console.log("log out");
            await signOut(auth);
            router.push("/login");
        } catch (error) {
            console.log(error);
        }
    };

    const handleHistoryClick = () => {
        router.push("/history");
    };

    const handleImageCutClick = () => {
        router.push("/imagecut");
    };

    const handleMainClick = () => {
        router.push("/main");
    };

    return (
        <header className="bg-transparent text-white py-4 px-6 text-2xl">
            <nav className="container mx-auto flex justify-between items-center">
                <Button
                    text="ArticulateAI"
                    className="mr-2 text-yellow-dark font-bold text-xl"
                    onClick={handleMainClick}
                />

                <button
                    className="text-yellow-dark"
                    onClick={handleHistoryClick}
                >
                    <FontAwesomeIcon icon={faBookOpen} />
                </button>
                <button
                    className="text-yellow-light"
                    onClick={handleImageCutClick}
                >
                    <FontAwesomeIcon icon={faScissors} />
                </button>
                <div className="flex items-center">
                    <DiscordButton className="text-2xl" />
                    <Button
                        text="Sign Out"
                        className="mr-2 text-[#edde98]  font-bold"
                        onClick={handleGoogleLogout}
                    />
                </div>
            </nav>
        </header>
    );
};

export default Header;
