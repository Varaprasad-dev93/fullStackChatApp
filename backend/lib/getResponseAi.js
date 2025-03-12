import { Groq } from 'groq-sdk'
import dotenv from 'dotenv'
dotenv.config()
const client = new Groq({
    apiKey:process.env.GROQ_SDK_APIKEY
});
export const getResponse = async (text) => {


    function detectLanguage(userMessage) {
        const keywords = {
            javascript: ["JS", "JavaScript", "react", "node", "express"],
            python: ["Python", "Django", "Flask", "numpy"],
            java: ["Java", "Spring", "Hibernate"],
            c: ["C", "C programming"],
            cpp: ["C++", "cpp", "STL"],
        };
    
        for (const [lang, words] of Object.entries(keywords)) {
            if (words.some((word) => userMessage.toLowerCase().includes(word.toLowerCase()))) {
                return lang;
            }
        }
        return "plaintext"; // Default if no language is detected
    }

    
    try {
        const chatCompletion = await client.chat.completions.create({
            model:'llama-3.3-70b-versatile',
            messages:[
                {
                    role:'system',
                    content:'You have to write code on monaco editor and expert on coding languages like python,java,c++,c and etc.You need to verify the errors and improve the efficiency of the code and explain the process of the code how it works and give static inputs only.Finally make it like humanzied code'
                },
                {
                    role:'user',
                    content:text||"Hii"
                },
            ],
        })
        const language=detectLanguage(chatCompletion.choices[0].message.content)
        return `\`\`\`${language}\n${chatCompletion.choices[0].message.content}\n\`\`\``;
    } catch (error) {
        console.error("Error at the Model",error)
        throw new Error("Error at the model");
        
    }
}