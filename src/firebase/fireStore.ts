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
import { COLLECTION_NAME_PROMPT_PAIR, FIELD_NAME_USER_INPUT, FIELD_NAME_USER_OUTPUT } from "@/constants/firestore";

const db = getFirestore(firebase)
const usersCollectionRef = collection(db, COLLECTION_NAME_PROMPT_PAIR);

const checkUserInDoc = async (userID: string) => {
    const userDocRef = doc(db, COLLECTION_NAME_PROMPT_PAIR, userID);
    try {
        const userDocSnap = await getDoc(userDocRef);
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

const createUser = async (userID: string, userInput: string, userOutput: string) => {
    if (await checkUserInDoc(userID)) {
        updateUser(userID, userInput, userOutput)
        return
    }
    try {
        const userDocRef = doc(usersCollectionRef, userID);
        await setDoc(userDocRef, { [FIELD_NAME_USER_INPUT]: [userInput], [FIELD_NAME_USER_OUTPUT]: [userOutput] });
        console.log("Document written with ID: ", userDocRef.id);
        console.log("userInput: ", userInput);
        console.log("userOutput: ", userOutput);

    } catch (e) {
        console.error("Error adding document: ", e);
    }
};

const updateUser = async (userID: string, userInput: string, userOutput: string) => {
    const userDocRef = doc(db, COLLECTION_NAME_PROMPT_PAIR, userID);
    try {
        await updateDoc(userDocRef, {
            [FIELD_NAME_USER_INPUT]: arrayUnion(userInput),
            [FIELD_NAME_USER_OUTPUT]: arrayUnion(userOutput),
        });
        console.log("Document updated successfully");
    } catch (error) {
        console.error("Error updating document: ", error);
    }
};

const deleteUser = async (id: string) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
};

export { createUser, updateUser, deleteUser, checkUserInDoc };