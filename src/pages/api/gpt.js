import axios from 'axios';
const GENERATE_URL = "https://flask-api-383807.wn.r.appspot.com/generate";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        console.log("POST")
        const userPrompt = req.body.prompt; // Access the prompt data from the request body
        try {
            console.log("generateResponse function");
            const response = await axios.post(GENERATE_URL, {
                prompt: userPrompt,
            });
            console.log(response)
            res.status(200).json({ generatedText: response.data.response.choices[0].message.content });

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error fetching data from GPT API' });
        }
    } else if (req.method === 'GET') {
        console.log("GET")

        const response = await axios.get(GENERATE_URL)
        console.log(response)
        res.status(200).json({ result: response.data })
    }

    else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
