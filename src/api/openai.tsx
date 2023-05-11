// api.ts
import axios from "axios";

interface ApiResponse {
    generatedText: string;
}

const URL = "https://flask-api-383807.wn.r.appspot.com";
// const URL = "http://127.0.0.1:8001";

async function photographyApiCall(userInput: string): Promise<ApiResponse> {
    console.log("photographyApiCall:");

    console.log("userInput: ", userInput);
    const apiUrl: string = URL + "/photography";
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
    console.log("generalApiCall:");

    console.log("userInput: ", userInput);

    const apiUrl: string = URL + "/generate";
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

async function generalV2ApiCall(userInput: string): Promise<ApiResponse> {
    console.log("generalApiCall:");

    console.log("userInput: ", userInput);

    const apiUrl: string = URL + "/general";
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

async function animeApiCall(userInput: string): Promise<ApiResponse> {
    console.log("animeApiCall:");

    console.log("userInput: ", userInput);

    const apiUrl: string = URL + "/anime";
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

export default {
    photographyApiCall,
    generalApiCall,
    generalV2ApiCall,
};
