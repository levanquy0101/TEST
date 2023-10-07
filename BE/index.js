const express = require('express');
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require('openai');

const app = express();
app.use(bodyParser.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

app.post('/chat', async (req, res) => {
  const { prompt } = req.body;

  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt,
    temperature: 0.5,
    max_tokens: 100,
  });

  res.json({
    message: response.data.choices[0].text
  });
});

app.listen(5000);