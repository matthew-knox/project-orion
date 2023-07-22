const Discord = require('discord.js');
const chalk = require('chalk');

module.exports = async (client) => {

    await client.user.setPresence({
        activities: [
            {
                name: `Test`,
                type: Discord.ActivityType.Listening
            }
        ],
        status: 'online'
    });

    console.log(chalk.bold.greenBright(`${client.user.tag} is online!`));

};