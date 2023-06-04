

import express from "express";

import { config } from "dotenv"
config()


import { Configuration, OpenAIApi } from "openai"
import readline from "readline"
import { appendFile } from "fs";

const openAi = new OpenAIApi(
    new Configuration({
        apiKey: process.env.API_KEY,
    })
)

// const userInterface = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// })

const app = express();
app.use(express.json())

app.post("/chat", async (req, res) => {
    try {
        
        const response = await openAi.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: req.body.message }],
        })
        console.log(response.data.choices[0].message.content)
        res.send(response.data.choices[0].message.content)
    } catch (error) {
        res.send(error)
    }
})

app.listen("8080",()=>{
    console.log("Server Started");
})
// userInterface.prompt()
// userInterface.on("line", async input => {
//   userInterface.prompt()
// })

