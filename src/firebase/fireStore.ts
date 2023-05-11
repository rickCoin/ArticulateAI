import {
    collection,
    arrayUnion,
    getDoc,
    updateDoc,
    deleteDoc,
    setDoc,
    doc, getFirestore
} from "firebase/firestore";
import { firebase } from "./firebaseClient";
import { COLLECTION_NAME_GENERAL_PROMPT_PAIR, COLLECTION_NAME_GENERAL_V2_PROMPT_PAIR, COLLECTION_NAME_PHOTOGRAPHIC_PROMPT_PAIR, COLLECTION_NAME_USER_DATA, FIELD_NAME_USER_ID, FIELD_NAME_USER_INPUT, FIELD_NAME_USER_OUTPUT } from "@/constants/firestore";

const db = getFirestore(firebase)

import { createHash } from "crypto";

const hashUserInput = (user_input: string): string => {
    user_input = user_input.trim();
    const hashed_input = createHash("sha256").update(user_input, "utf-8").digest("hex");
    return hashed_input;
};


const userDataExist = async (userID: string) => {
    const userCollection = collection(
        db,
        COLLECTION_NAME_USER_DATA
    );
    const userDataDocRef = doc(userCollection, userID);
    try {
        const userDocSnap = await getDoc(userDataDocRef);
        if (userDocSnap.exists()) {
            console.log("User ID exists");
            return true;
        } else {
            console.log("User ID does not exist");
            return false;
        }
    } catch (error) {
        console.error("Error checking user ID: ", error);
        return false;
    }
};


const setUserData = async (userID: string) => {
    const userDataCollection = collection(
        db,
        COLLECTION_NAME_USER_DATA
    );

    const userDataDocRef = doc(userDataCollection, userID);

    try {
        const haveUserData = await userDataExist(userID)
        if (!haveUserData) {
            console.log("no user data")
            console.log("set userDataDocRef")
            await setDoc(userDataDocRef, { [FIELD_NAME_USER_ID]: userID });
        }

    } catch (error) {
        console.error("Error updating document: ", error);
    }
};


const setGeneralPrompt = async (userID: string, userInput: string, userOutput: string) => {
    console.log("setGeneralPrompt")
    await setUserData(userID)
    const hashInput = hashUserInput(userInput.trim())

    const generalPromptCollection = collection(
        db,
        COLLECTION_NAME_USER_DATA,
        userID,
        COLLECTION_NAME_GENERAL_PROMPT_PAIR
    );
    const generalPromptDocRef = doc(generalPromptCollection, hashInput);
    const generalPromptSnap = await getDoc(generalPromptDocRef);
    try {
        if (generalPromptSnap.exists()) {
            console.log("update generalPromptDocRef")

            await updateDoc(generalPromptDocRef, {
                [FIELD_NAME_USER_INPUT]: userInput,
                [FIELD_NAME_USER_OUTPUT]: arrayUnion(userOutput),
            });
        } else {
            console.log("set generalPromptDocRef")
            await setDoc(generalPromptDocRef, { [FIELD_NAME_USER_INPUT]: userInput, [FIELD_NAME_USER_OUTPUT]: [userOutput] });
        }

    } catch (error) {
        console.error("Error updating document: ", error);
    }
}


const setPhotographicPrompt = async (userID: string, userInput: string, userOutput: string) => {
    console.log("setPhotographicPrompt")

    await setUserData(userID)
    const hashInput = hashUserInput(userInput.trim())
    const photographicPromptCollection = collection(
        db,
        COLLECTION_NAME_USER_DATA,
        userID,
        COLLECTION_NAME_PHOTOGRAPHIC_PROMPT_PAIR
    );
    const photographicPromptDocRef = doc(photographicPromptCollection, hashInput);
    const photographicPromptSnap = await getDoc(photographicPromptDocRef);
    try {
        if (photographicPromptSnap.exists()) {
            console.log("update photographicPromptDocRef")

            await updateDoc(photographicPromptDocRef, {
                [FIELD_NAME_USER_INPUT]: userInput,
                [FIELD_NAME_USER_OUTPUT]: arrayUnion(userOutput),
            });
        } else {
            console.log("set photographicPromptDocRef")
            await setDoc(photographicPromptDocRef, { [FIELD_NAME_USER_INPUT]: userInput, [FIELD_NAME_USER_OUTPUT]: [userOutput] });
        }


    } catch (error) {
        console.error("Error updating document: ", error);
    }
}

const setGenerateV2Prompt = async (userID: string, userInput: string, userOutput: string) => {
    console.log("setGenerateV2Prompt")

    await setUserData(userID)
    const hashInput = hashUserInput(userInput.trim())
    const generateV2PromptCollection = collection(
        db,
        COLLECTION_NAME_USER_DATA,
        userID,
        COLLECTION_NAME_GENERAL_V2_PROMPT_PAIR
    );
    const generateV2PromptDocRef = doc(generateV2PromptCollection, hashInput);
    const generateV2PromptSnap = await getDoc(generateV2PromptDocRef);
    try {
        if (generateV2PromptSnap.exists()) {
            console.log("update generateV2PromptDocRef")

            await updateDoc(generateV2PromptDocRef, {
                [FIELD_NAME_USER_INPUT]: userInput,
                [FIELD_NAME_USER_OUTPUT]: arrayUnion(userOutput),
            });
        } else {
            console.log("set generateV2PromptDocRef")
            await setDoc(generateV2PromptDocRef, { [FIELD_NAME_USER_INPUT]: userInput, [FIELD_NAME_USER_OUTPUT]: [userOutput] });
        }


    } catch (error) {
        console.error("Error updating document: ", error);
    }
}



const deleteUser = async (id: string) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
};

export { setUserData, setPhotographicPrompt, setGeneralPrompt, setGenerateV2Prompt };