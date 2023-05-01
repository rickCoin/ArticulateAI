import { useState, useEffect } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ChatWithGPT from "@/components/ChatWithGPT";
import { useRouter } from "next/router";
import { observeAuthState } from "@/firebase/firebaseClient";

const MainPage = () => {
    const router = useRouter();
    const [userID, setUserID] = useState("");
    useEffect(() => {
        observeAuthState((user) => {
            if (user) {
                console.log("User is signed in:");
                setUserID(user.uid);
            } else {
                console.log("User is not signed in");
                router.push("/login");
            }
        });
    }, [router]);

    return (
        <div className="flex flex-col h-screen overflow-y-scroll w-full bg-gradient-to-r from-[#010230] to-[#132b78]">
            <Header />
            <HeroSection />
            <ChatWithGPT userID={userID} />
        </div>
    );
};

export default MainPage;
