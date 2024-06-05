const port = 8000
const express = require("express")
const cors = require("cors")
const app = express()


app.use(cors())
app.use(express.json())

require("dotenv").config()

const { GoogleGenerativeAI } = require("@google/generative-ai")

const genAi = new GoogleGenerativeAI(process.env.API_KEY)

app.post('/gemini', async (req, res) => {
    console.log(req.body.history);
    console.log(req.body.message);

    const model = genAi.getGenerativeModel({ model: "gemini-pro" })

    const chat = model.startChat({
        history: req.body.history,
        generationConfig: {
          maxOutputTokens: 100,
        },
      });

    const msg = req.body.message

    const result = await chat.sendMessage(msg)

    const response = result.response
    const text = response.text()

    res.send(text)
})

app.listen(port, () => console.log("Listening on port 8000"))