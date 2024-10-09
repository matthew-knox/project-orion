<h1 align="center">Project Orion</h1>

GPT Discord Bot is the original Discord AI bot written in **[JavaScript](https://www.javascript.com/)**, using the **[Discord.js V14](discord.js.org/)** library powered by [OpenAI](https://openai.com/)'s models. It has different features such as answering all of your questions or drawing your imagination and even translating your prompts from any language to any other language you want and also has a configurable Auto Moderation system powered by AI which watches all of your server messages (if you want, you can turn it off/on) and report flagged messages to Admins and they can moderate it and other features which you can see example in **[Screenshots](https://github.com/iTzArshia/GPT-Discord-Bot#-screenshots)**!
## 🚧 Requirements
1. Discord Bot Token **[Guide](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot)**  
   1.1. Enable "Message Content Intent" and "Server Members Intent" in Discord Developer Portal
2. OpenAI API Key
3. **[Node.js 16.9.0](https://nodejs.org/en/download/)** or higher
# 🚀 Getting Started
## ⚙️ Configuration
Go to `config.json` in the `configs` folder and fill out the values:
```json
{
    "Prefix": "Put anything you want as a prefix",
    "MainColor": "Put any #HexCode you want for embeds color",
    "ErrorColor": "Put any #HexCode you want for embeds color when there is an error",
    "ClientID": "Put your Bot ID/Client ID here",
    "Token": "Put your Bot Token here",
    "OpenAIapiKey": "Put your Open AI API Key here"
}
```
⚠️ **Note: Never commit or share your token publicly** ⚠️

and if you want to use the chatbot or moderation model fill and config `chatbot.js` and `moderation.js` in the `configs` folder (Information on how to configure them is available in the files themselves)
## 🧠 installation
Open your terminal and install the required packages with
```sh
npm install
```
After installation finishes run `node register.js` to deploy slash commands and then run `node index.js` in the terminal to start the bot.
## 💫 Features
### Commands
`Ask` : Answers your questions with all GPT models (**GPT-3.5-Turbo** & **GPT-4.0**)!

`Imagine` : Draw your imaginations with **Dall∙E**!

`Optimize` : Optimizes your imaginations to get a better response with the imagine command with **GPT-3.5-Turbo**!

`Translate` : Translate your texts in any language to any language you want with **GPT-3.5-Turbo**.

`Read` : Create a tarot card reading with **GPT-3.5-Turbo**.
### Systems
`ChatBot` : A Channel where you can talk to the bot and have ChatGPT-Style conversation with **GPT-3.5-Turbo**. (It has a temporary memory so that it can remember the contents for a short time)

`Auto-Moderation` : An Auto Mod system that checks all of  your server messages and sends a log for your Admins if a message content complies with OpenAI's usage policies with **Text-Moderation-Stable** (moderation model is free to use and you can config it as much as you want)
