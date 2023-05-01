import { useRouter } from "next/router";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/firebase/firebaseClient";
import Button from "@/components/Button";
import HeroSection from "@/components/HeroSection";
import DiscordButton from "@/components/DiscordButton";
const LoginPage = () => {
    const router = useRouter();

    //Sign in with google
    const googleProvider = new GoogleAuthProvider();
    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            // Check if the user object exists
            if (result.user) {
                console.error("User login");
                // Redirect to the main page
                router.push("/main");
            } else {
                console.error("User not found");
                // Handle the case when the user object is not available
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex flex-col h-screen bg-gradient-radial overflow-y-scroll from-blue-dark to-blue-light items-center justify-center">
            <HeroSection />
            <DiscordButton className="text-4xl" />
            <Button
                onClick={handleGoogleLogin}
                className=" text-xl border-4 border-yellow-light bg-transparent text-yellow-light mt-4 mb-4 py-2 px-4 rounded-2xl self-center hover:bg-yellow-light"
                text="Sign In"
            />
        </div>
    );
};

export default LoginPage;
