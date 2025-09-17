require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// words to censor
const bannedWords = ["badword1", "badword2", "no-no"];

client.on("ready", () => {
    console.log(`✅ Logged in as ${client.user.tag}`);
});

client.on("messageCreate", (message) => {
    if (message.author.bot) return;

    let lowered = message.content.toLowerCase();

    if (bannedWords.some(word => lowered.includes(word))) {
        message.delete()
            .then(() => {
                message.channel.send({
                    content: `🚫 Yo <@${message.author.id}>, chill with the language!`
                });
            })
            .catch(console.error);
    }
});

client.login(process.env.TOKEN);