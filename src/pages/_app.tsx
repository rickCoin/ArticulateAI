import "@/styles/globals.css";
import { useEffect } from "react";
import { useRouter } from "next/router";
import type { AppProps } from "next/app";
import { logEvent, getAnalytics } from "firebase/analytics";
import { firebase } from "@/firebase/firebaseClient";
export default function App({ Component, pageProps }: AppProps) {
    useEffect(() => {
        if (typeof window !== "undefined") {
            const analytics = getAnalytics(firebase);
            console.log("log event");
            logEvent(analytics, "notification_received");
            logEvent(analytics, "screen_view");
            logEvent(analytics, "user_engagement");
            logEvent(analytics, "login");
        }
    }, []);

    return <Component {...pageProps} />;
}
