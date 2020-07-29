//Enables reading from other files
const fs = require("fs");

// Import the discord.js
const Discord = require("discord.js");

// Create an instance of a Discord client
const client = new Discord.Client();

// Contains bot token and api keys
client.config = require("./config.json");

// Creates a Collection for commands
client.commands = new Discord.Collection();


// Loads all the commands
fs.readdir("./cmds/", (err, files) => {
	if(err) {
        console.error(err);
    }

	let jsFiles = files.filter(f => f.split(".").pop() === "js");

	if(jsFiles.length <= 0) {
		console.log("No Commands to Load.");
		return;
	}
    else {
        console.log("Loaded Commands:", jsFiles);
    }

    jsFiles.forEach(fileName => {
        let cmd = require(`./cmds/${fileName}`)
        client.commands.set(cmd.help.name, cmd);
    });
});

// Triggers when the bot is turned on
client.on("ready", () => {
    console.log(`${client.user.username} has started, with ${client.users.cache.size} users, in ${client.channels.cache.size} channels of ${client.guilds.cache.size} guilds.`); 

    client.user.setActivity(`-help`);
});

// Triggers when the bot joins a guild
client.on("guildCreate", guild => {
    console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
});

// Triggers when the bot is removed from a guild.
client.on("guildDelete", guild => {
    console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
});


// Triggers whenever a message is sent
client.on("message", message => {
    if(message.author.bot) return;

    let prefix = "-";

    if(message.content.indexOf("<@!406315185507139584>") === 0) return message.channel.send(`Use "${prefix}" to talk to me!`);

    if(message.content.indexOf(prefix) !== 0) return;

    // Splits the message into a command and an array of args
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    // Logs user,commands, and args
    console.log(`Username: ${message.author.username} ID: ${message.author.id} Command: ${command} Args: ${args.join(" ")}`)

    // Looks for the command within client.commands
    let cmd = client.commands.get(command);
    if(cmd) {
        cmd.run(client, message, args);
    }
});


// Log bot in
client.login(client.config.token);
