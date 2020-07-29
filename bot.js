// Import the discord.js
const Discord = require("discord.js");

// Create an instance of a Discord client
const client = new Discord.Client({disableEveryone: true});

// The token of the bot
// The prefix of the bot
client.config = require("./config.json");

//Enables reading from other files
const fs = require("fs");

// Creates a Collection for commands
client.commands = new Discord.Collection();


// Loads all the commands
fs.readdir("./cmds/", (err, files) => {
	if(err) console.error(err);

	let jsfiles = files.filter(f => f.split(".").pop() === "js");
	if(jsfiles.length <= 0){
		console.log("No Commands to Load.");
		return;
	}

	jsfiles.forEach((f, i) => {
		let props = require(`./cmds/${f}`)
		client.commands.set(props.help.name, props);
	});
});

// Triggers when the bot is turned on
client.on("ready", async () => {
	// Logs that the bot is ready
	console.log(`${client.user.username} has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
	
	//Sets the game to -help
	client.user.setActivity(`-help`);
});

  // Triggers when the bot joins a guild
client.on("guildCreate", guild => {
	//Logs the bot has joined a guild
	console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
});

// Triggers when the bot is removed from a guild.
client.on("guildDelete", guild => {
	//Logs that the bot has been removed from a guild
	console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
});


// Triggers whenever a message is sent
client.on("message", message => {

	// Ignores all bot messages
	if(message.author.bot) return;
	
	var prefix = "-";

	//console.log(message.content);
	if(message.content.indexOf("<@406315185507139584>")===0) return message.channel.send(`Use ${prefix} to talk to me!`);

	//Ignore all messages without the prefix
	if(message.content.indexOf(prefix)!==0) return;

	//splits the message into a command and an array of args
	const args = message.content.slice(prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();

    // Logs user,commands, and args
	console.log(`Username: ${message.author.username} ID: ${message.author.id} Command: ${command} Args: ${args.join(" ")}`)

	// Looks for the command within client.commands
	let cmd = client.commands.get(command);
	if(cmd) cmd.run(client, message, args);
});


// Log bot in
client.login(client.config.token);
