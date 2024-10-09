const Discord = require('discord.js');
const openAI = require('openai');
const chalk = require('chalk');
const tarotCards = require('../../utils/tarotCards');
const config = require('../../configs/config.json');

// Function to draw random tarot cards
function drawTarotCards(numCards) {
    const shuffledCards = tarotCards.sort(() => Math.random() - 0.5);
    return shuffledCards.slice(0, numCards);
}

module.exports = {
    name: "read",
    aliases: ['r', 'tarot', 'cards'],
    description: "Draw tarot cards and get a mystical reading!",

    async execute(client, message, args, cmd) {
        await message.channel.sendTyping();

        const numCards = args[0] && !isNaN(args[0]) && parseInt(args[0]) > 0 ? parseInt(args[0]) : 1;

        // Draw the tarot cards
        const drawnCards = drawTarotCards(numCards);
        const cardList = drawnCards.join(', ');

        const configuration = new openAI.Configuration({ apiKey: config.OpenAIapiKey });
        const openai = new openAI.OpenAIApi(configuration);

        const prompt = `Provide a tarot reading for the following cards: ${cardList}. The reading should be mystical, introspective, and slightly ominous.`;

        // Make the OpenAI API call
        openai.createCompletion({
            model: "text-davinci-003",
            prompt: prompt,
            max_tokens: 150,
            temperature: 0.7,
        }).then(async (response) => {

            const tarotReading = response.data.choices[0].text.trim();

            const embed = new Discord.EmbedBuilder()
                .setColor(config.MainColor)
                .setAuthor({
                    name: `Your Tarot Reading (${numCards} card${numCards > 1 ? 's' : ''})`,
                    iconURL: message.author.displayAvatarURL()
                })
                .setDescription(`**Cards drawn**: ${cardList}\n\n**Reading**:\n${tarotReading}`)
                .setFooter({
                    text: `Tarot reading by ${client.user.username}`,
                    iconURL: client.user.displayAvatarURL()
                });

            await message.reply({ embeds: [embed] });

        }).catch(async (error) => {
            console.error(chalk.bold.redBright(error));

            if (error.response) {
                const embed = new Discord.EmbedBuilder()
                    .setColor(config.ErrorColor)
                    .setAuthor({
                        name: message.author.username,
                        iconURL: message.author.displayAvatarURL()
                    })
                    .setDescription(error.response.data.error.message);

                await message.reply({ embeds: [embed] }).catch(() => null);

            } else if (error.message) {
                const embed = new Discord.EmbedBuilder()
                    .setColor(config.ErrorColor)
                    .setAuthor({
                        name: message.author.username,
                        iconURL: message.author.displayAvatarURL()
                    })
                    .setDescription(error.message);

                await message.reply({ embeds: [embed] }).catch(() => null);
            }
        });
    }
};
