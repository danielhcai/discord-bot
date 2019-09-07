// Import the discord.js
const Discord = require("discord.js");

// Create an instance of a Discord client
const client = new Discord.Client({disableEveryone: true});

// The token of the bot
// The prefix of the bot
client.config = require("./config.json");

//Enables reading from other files
const fs = require("fs");

// Import Enmap
const Enmap = require("enmap");
const EnmapLevel = require("enmap-level");

client.kiss = require("./url/kiss.json");
client.slap = require("./url/slap.json");

// Creates a Collection for commands
client.commands = new Discord.Collection();

// Creates a new Enmap
client.provider = new EnmapLevel({name: "settings"});
client.settings = new Enmap({provider: client.provider});

client.shop = new EnmapLevel({name: "currency"});
client.currency = new Enmap({provider: client.shop});

// Defualt server settings for the bot
client.defaultSettings = {
	prefix: "-",
}

client.defaultShop = {
	coins: 0,
}

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

// Makes sure all servers have server settings
function checkServer(guild, key, map){
	if(!client.settings.has(key)){
		client.settings.set(key,client.defaultSettings);
		console.log("add 2")
	}
	var guildSettings = client.settings.get(key);

	if(!guildSettings.prefix) guildSettings.prefix = "-";
	guild.members.forEach(addMember);

}

//Checks off a member has settings
function checkMember(member){
	if(!client.currency.has(member.id)) client.currency.set(member.id, client.defaultShop);

	var shop = client.currency.get(member.id)

	if(!shop.coins) shop.coins = 0; 
}

//Adds a member to the settings
//ERROR
function addMember(member, key, map){
	if(!client.currency.has(key)) client.currency.set(key, client.defaultShop);

	var shop = client.currency.get(key)

	if(!shop.coins) shop.coins = 0; 
}

// Triggers when the bot is turned on
client.on("ready", async () => {
	// Logs that the bot is ready
	console.log(`${client.user.username} has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
	
	//Sets the game to -help
	client.user.setActivity(`-help`);

	// Checks server settings
	client.guilds.forEach(checkServer);
});

  // Triggers when the bot joins a guild
client.on("guildCreate", guild => {
	//Logs the bot has joined a guild
	console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
	
	// Adds server settings whenever the bot joins a server
	client.settings.set(guild.id, client.defaultSettings);
	console.log("add 1")
	guild.members.forEach(addMember);
});

// Triggers when the bot is removed from a guild.
client.on("guildDelete", guild => {
	//Logs that the bot has been removed from a guild
	console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
});

client.on("guildMemberAdd", member => {
	checkMember(member);
});

// Triggers whenever a message is sent
client.on("message", async message => {

	// Ignores all bot messages
	if(message.author.bot) return;
	
	var prefix = "-";

	//Imports server settings
	if(message.channel.type == "text"){
		var guildSettings = client.settings.get(message.guild.id);
		prefix = guildSettings.prefix;
	}
	//console.log(message.content);
	if(message.content.indexOf("<@406315185507139584>")===0) return message.channel.send(`Use ${prefix} to talk to me!`);

	//Ignore all messages without the prefix
	if(message.content.indexOf(prefix)!==0) return;

	//splits the message into a command and an array of args
	const args = message.content.slice(prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();

    // Logs user,commands, and args
	console.log(`Username: ${message.author.username} ID: ${message.author.id} Command: ${command} Args: ${args.join(" ")}`)

	if(command === "reset"){
		shop = client.currency.get(message.author.id);
		shop.coins = 10;
		client.currency.set(message.author.id,shop);
	}
	// Looks for the command within client.commands
	let cmd = client.commands.get(command);
	if(cmd) cmd.run(client, message, args);
});


// Log bot in
client.login(client.config.token);