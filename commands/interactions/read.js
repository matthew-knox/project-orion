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
    data: new Discord.SlashCommandBuilder()
        .setName("read")
        .setDescription("Receive a tarot card reading.")
        .addIntegerOption(option => option
            .setName("numcards")
            .setDescription("Number of cards to draw (Default: 1)")
            .setMinValue(1)
        )
        .addStringOption(option => option
            .setName('ephemeral')
            .setDescription('Hides the bot\'s reply from others. (Default: Disable)')
            .addChoices(
                {
                    name: 'Enable',
                    value: 'Enable'
                },
                {
                    name: 'Disable',
                    value: 'Disable'
                }
            )
        ),

    async execute(client, interaction) {
        const numCards = interaction.options.getInteger('numcards') || 1;
        const ephemeralChoice = interaction.options.getString('ephemeral');
        const ephemeral = ephemeralChoice === 'Enable' ? true : false;
        await interaction.deferReply({ ephemeral: ephemeral });

        // Draw the tarot cards
        const drawnCards = drawTarotCards(numCards);
        const cardList = drawnCards.join(', ');

        try {
            // Create OpenAI configuration
            const configuration = new openAI.Configuration({ apiKey: config.OpenAIapiKey });
            const openai = new openAI.OpenAIApi(configuration);

            // Ask OpenAI to create a reading based on the drawn cards
            const prompt = `Provide a tarot reading for the following cards: ${cardList}. The reading should be mystical, introspective, and slightly ominous. Please use the most common reading for the number of cards given, they are separated by commas (,)`;

            const response = await openai.createCompletion({
                model: "gpt-3.5-turbo",
                prompt: prompt,
                max_tokens: 150,
                temperature: 0.7,
            });

            const tarotReading = response.data.choices[0].text.trim();

            // Create an embed with the tarot reading
            const embed = new Discord.EmbedBuilder()
                .setColor(config.MainColor)
                .setAuthor({
                    name: `Your Tarot Reading (${numCards} card${numCards > 1 ? 's' : ''})`,
                    iconURL: interaction.user.displayAvatarURL()
                })
                .setDescription(`**Cards drawn**: ${cardList}\n\n**Reading**:\n${tarotReading}`)
                .setFooter({
                    text: `Tarot reading by ${client.user.username}`,
                    iconURL: client.user.displayAvatarURL()
                });

            await interaction.editReply({
                embeds: [embed]
            });

        } catch (error) {
            console.error(chalk.bold.redBright(error));

            const embed = new Discord.EmbedBuilder()
                .setColor(config.ErrorColor)
                .setDescription("An error occurred while generating your tarot reading. Please try again later.");

            await interaction.editReply({ embeds: [embed] }).catch(() => null);
        }
    }
};
