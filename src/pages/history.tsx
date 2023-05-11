import React, { useState, useEffect } from "react";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { auth } from "@/firebase/firebaseClient";

import {
    COLLECTION_NAME_GENERAL_PROMPT_PAIR,
    COLLECTION_NAME_PHOTOGRAPHIC_PROMPT_PAIR,
    COLLECTION_NAME_USER_DATA,
} from "@/constants/firestore";
import Header from "@/components/Header";
import Button from "@/components/Button";

interface UserData {
    user_input: string;
    user_outputs: string[];
}
// todo move the logic to api
const fetchPhotographyHistory = async (userID: string) => {
    const allUserData: UserData[] = [];
    const db = getFirestore();

    // collection path: COLLECTION_NAME_GENERAL_PROMPT_PAIR/userID/pairs
    const pair_collection = collection(
        db,
        COLLECTION_NAME_USER_DATA,
        userID,
        COLLECTION_NAME_PHOTOGRAPHIC_PROMPT_PAIR
    );

    try {
        const pair_docs_snapshot = await getDocs(pair_collection);

        pair_docs_snapshot.forEach((doc) => {
            const input_data = doc.data() as UserData;
            allUserData.push(input_data);
        });

        return allUserData;
    } catch (error) {
        console.error("Error fetching user history: ", error);
        return null;
    }
};

const fetchGeneralHistory = async (userID: string) => {
    const allUserData: UserData[] = [];
    const db = getFirestore();

    // collection path: COLLECTION_NAME_GENERAL_PROMPT_PAIR/userID/pairs
    const pair_collection = collection(
        db,
        COLLECTION_NAME_USER_DATA,
        userID,
        COLLECTION_NAME_GENERAL_PROMPT_PAIR
    );

    try {
        const pair_docs_snapshot = await getDocs(pair_collection);

        pair_docs_snapshot.forEach((doc) => {
            const input_data = doc.data() as UserData;
            allUserData.push(input_data);
        });

        return allUserData;
    } catch (error) {
        console.error("Error fetching user history: ", error);
        return null;
    }
};

const TablePage: React.FC = () => {
    const [inputs, setInputs] = useState<UserData[]>([]);
    const userID = auth.currentUser;

    const [selectedHistory, setSelectedHistory] = useState("general"); // New state for selected history
    const [loading, setLoading] = useState(false); // New loading state

    useEffect(() => {
        if (userID == null) {
        } else {
            const fetchData = async () => {
                setLoading(true);
                let data;
                if (selectedHistory === "general") {
                    data = await fetchGeneralHistory(userID.uid);
                } else {
                    data = await fetchPhotographyHistory(userID.uid);
                }
                if (data != null) {
                    setInputs(data);
                    setLoading(false);
                }
            };

            fetchData();
        }
    }, [selectedHistory]); // Add selectedHistory to the dependency array

    const handleSwitchHistory = () => {
        setSelectedHistory((prevSelectedHistory) =>
            prevSelectedHistory === "general" ? "photography" : "general"
        );
    };
    return (
        <div className="flex flex-col h-screen overflow-y-scroll w-full bg-gradient-radial from-blue-dark to-blue-light">
            <Header />
            <Button
                onClick={handleSwitchHistory}
                text={
                    selectedHistory === "general"
                        ? "General Prompts History"
                        : "Photography Prompts History"
                }
                className="border bg-transparent text-white mt-4 mb-4 py-2 px-4 rounded-2xl self-center hover:bg-yellow-light"
            />

            <div className="container mx-auto px-4 py-8 ">
                {loading ? (
                    <div className="text-center text-yellow-light">
                        Loading...
                    </div>
                ) : (
                    <table className="w-full table-auto">
                        <tbody>
                            {inputs.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={2}
                                        className="text-center text-yellow-light"
                                    >
                                        No data available
                                    </td>
                                </tr>
                            ) : (
                                inputs.map((input_data, index) => (
                                    <tr
                                        key={index}
                                        className="bg-transparent  text-yellow-light"
                                    >
                                        <td className="border border-yellow-light px-4 py-2">
                                            {input_data.user_input}
                                        </td>
                                        <td className="border border-yellow-light px-8 py-2">
                                            <ul className="list-disc">
                                                {input_data.user_outputs.map(
                                                    (output, index) => (
                                                        <li key={index}>
                                                            {output}
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default TablePage;
