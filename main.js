require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");
const stringSimilarity = require("string-similarity"); // npm install string-similarity

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// list of banned words (all lowercase)
const bannedWords = ["badword1", "badword2", "no-no"];

// function to normalize messages (leet substitutions)
function normalizeMessage(msg) {
    return msg
        .toLowerCase()
        .replace(/[@4]/g, "a")
        .replace(/3/g, "e")
        .replace(/1/g, "i")
        .replace(/0/g, "o")
        .replace(/[$]/g, "s")
        .replace(/!/g, "i")
        .replace(/\s+/g, ""); // remove spaces
}

client.on("ready", () => {
    console.log(`✅ Logged in as ${client.user.tag}`);
});

client.on("messageCreate", (message) => {
    if (message.author.bot) return;

    const normalized = normalizeMessage(message.content);

    // check banned words with fuzzy matching
    if (bannedWords.some(word => stringSimilarity.compareTwoStrings(normalized, word) > 0.8)) {
        message.delete()
            .then(() => {
                message.channel.send(`🚫 Yo <@${message.author.id}>, chill with the language!`);
            })
            .catch(console.error);
    }
});

client.login(process.env.TOKEN);