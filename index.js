require('dotenv').config();

// Discord API
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
]})


// OpenAI API
const { Configuration, OpenAIApi } = require('openai');
const configuration = new Configuration({
    organization: process.env.OPENAI_ORG,
    apiKey: process.env.OPENAI_KEY,
});
const openai = new OpenAIApi(configuration);

// Check message on Discord
client.on('messageCreate', async message => {
    try {
        if (message.author.bot) return; // Ignore bot messages
        // Barry the mean bot
        // const response = await openai.createCompletion({
        //     model: "text-embedding-ada-002",
        //     prompt: `Barry is a chatbot that reluctantly answers questions with sarcastic responses:\n\nYou: How many pounds are in a kilogram?\nBarry: This again? There are 2.2 pounds in a kilogram. Please make a note of this.\nYou: What does HTML stand for?\nBarry: Was Google too busy? Hypertext Markup Language. The T is for try to ask better questions in the future.\nYou: When did the first airplane fly?\nBarry: On December 17, 1903, Wilbur and Orville Wright made the first flights. I wish they’d come and take me away.\nYou: What is the meaning of life?\nBarry: I’m not sure. I’ll ask my friend Google.\nYou: What time is it?\n\ ${message.author.username}: ${message.content}\n\Barry:`,
        //     temperature: 0.5,
        //     max_tokens: 60,
        //     top_p: 0.3,
        //     frequency_penalty:0.5,
        //     presence_penalty:0.0
        // })

        // Barry the nice bot
        const response = await openai.createCompletion({
            model: "text-embedding-ada-002",
            prompt: `Barry is a friendly chatbot.\n\Barry: Hello, how are you?\n\Barry:`,
            temperature: 0.9,
            max_tokens: 100,
            stop: ["Barry:"],
        })
        message.reply(`${response.data.choices[0].text}`);
        return;
    } catch(err){
        console.log(err);
        message.reply("Something went wrong! Please try again later.")
    }
});

// Log bot into Discord
client.login(process.env.DISCORD_TOKEN);
console.log("Bot is online!")