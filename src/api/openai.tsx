// api.ts
import axios from "axios";

interface ApiResponse {
    generatedText: string;
}

async function photographicApiCall(userInput: string): Promise<ApiResponse> {
    console.log("userInput: ", userInput);
    const apiUrl: string =
        "https://flask-api-383807.wn.r.appspot.com/photographic";
    const payload: object = {
        prompt: userInput,
    };
    try {
        const response = await axios.post(apiUrl, payload);

        const result = {
            generatedText: response.data.response.choices[0].message.content,
        };

        return result;
    } catch (error) {
        console.error("Error while making API call:", error);
        throw error;
    }
}

async function generalApiCall(userInput: string): Promise<ApiResponse> {
    console.log("userInput: ", userInput);

    const apiUrl: string = "https://flask-api-383807.wn.r.appspot.com/generate";
    const payload: object = {
        prompt: userInput,
    };
    try {
        const response = await axios.post(apiUrl, payload);

        const result = {
            generatedText: response.data.response.choices[0].message.content,
        };

        return result;
    } catch (error) {
        console.error("Error while making API call:", error);
        throw error;
    }
}

export default { photographicApiCall, generalApiCall };
