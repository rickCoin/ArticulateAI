import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { auth } from "@/firebase/firebaseClient";
import { collection, doc, getDoc, getFirestore } from "firebase/firestore";
import Header from "@/components/Header";
import { COLLECTION_NAME_PROMPT_PAIR } from "@/constants/firestore";

type HistoryRow = {
    userInput: string[];
    userOutput: string[];
};

const fetchUserHistory = async (userID: string) => {
    const db = getFirestore();
    const userDocRef = doc(collection(db, COLLECTION_NAME_PROMPT_PAIR), userID);

    try {
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
            return userDocSnap.data() as HistoryRow;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error fetching user history: ", error);
        return null;
    }
};

const HistoryPage: React.FC = () => {
    const [history, setHistory] = useState<HistoryRow | null>(null);
    const [loading, setLoading] = useState(true);

    const router = useRouter();
    const userID = auth.currentUser;

    useEffect(() => {
        if (userID == null) {
            router.push("/login");
        } else {
            fetchUserHistory(userID.uid).then((data) => setHistory(data));
            setLoading(false);
        }
    }, [userID, router]);

    return (
        <div className="flex flex-col h-screen overflow-y-scroll w-full bg-gradient-to-r from-[#010230] to-[#132b78]">
            <Header />
            <div className="container mx-auto p-4">
                <h2 className="text-2xl font-bold text-yellow-light mb-4">
                    User History
                </h2>
                {loading ? (
                    <p className="text-white">Loading history...</p>
                ) : history ? (
                    <table className="w-full text-yellow-light">
                        <thead>
                            <tr>
                                <th className="border border-yellow-light p-2">
                                    User Input
                                </th>
                                <th className="border border-yellow-light p-2">
                                    User Output
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {history.userInput.map((input, index) => (
                                <tr key={index}>
                                    <td className="border border-yellow-light p-2">
                                        {input}
                                    </td>
                                    <td className="border border-yellow-light p-2">
                                        {history.userOutput[index]}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-yellow-light">No history found.</p>
                )}
            </div>
        </div>
    );
};

export default HistoryPage;
