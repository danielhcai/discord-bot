const Discord = module.require("discord.js");

module.exports.run = async (client, message, args) => {
	// Sends link with commands and code
	message.channel.send("Use this link to invite me:\n<https://discordapp.com/api/oauth2/authorize?client_id=406315185507139584&scope=bot>");
}

module.exports.help = {
	name: "invite"
}