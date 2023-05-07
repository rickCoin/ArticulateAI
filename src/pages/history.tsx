import React, { useState, useEffect } from "react";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { auth } from "@/firebase/firebaseClient";

import {
    COLLECTION_NAME_GENERAL_PROMPT_PAIR,
    COLLECTION_NAME_USER_DATA,
} from "@/constants/firestore";
import Header from "@/components/Header";

interface UserData {
    user_input: string;
    user_outputs: string[];
}
// todo move the logic to api
const fetchUserHistory = async (userID: string) => {
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

    useEffect(() => {
        if (userID == null) {
        } else {
            const fetchData = async () => {
                const data = await fetchUserHistory(userID.uid);
                if (data != null) {
                    setInputs(data);
                }
            };

            fetchData();
        }
    }, []);

    return (
        <div className="flex flex-col h-screen overflow-y-scroll w-full bg-gradient-radial from-blue-dark to-blue-light">
            <Header />
            <div className="container mx-auto px-4 py-8 ">
                <table className="w-full table-auto">
                    {/* ... */}
                    <tbody>
                        {inputs.map((input_data, index) => (
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
                                                <li key={index}>{output}</li>
                                            )
                                        )}
                                    </ul>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TablePage;
