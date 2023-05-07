import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

// TODO
const GENERATE_URL = "http://127.0.0.1:8080/photorealistic";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "POST") {
        console.log("POST");
        const userPrompt = req.body.prompt; // Access the prompt data from the request body
        try {
            console.log("photorealistic function");
            const response = await axios.post(GENERATE_URL, {
                prompt: userPrompt,
            });
            console.log(response);
            res.status(200).json({
                generatedText:
                    response.data.response.choices[0].message.content,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error fetching data from GPT API" });
        }
    } else if (req.method === "GET") {
        console.log("GET");

        const response = await axios.get(GENERATE_URL);
        console.log(response);
        res.status(200).json({ result: response.data });
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
}
