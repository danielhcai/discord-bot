const Discord = module.require("discord.js");

module.exports.run = async (client, message, args) => {
	// Change the Bots Prefix
	if(message.channel.type == "dm") return message.channel.send("You can not change prefix on a DM Channel.");

	const guildSettings = client.settings.get(message.guild.id);

	if(args.length <= 0) return message.channel.send(`Usage: ${guildSettings.prefix}prefix (prefix)`);
	if(guildSettings.prefix === args[0]) return message.channel.send("Already that prefix!");

  	guildSettings.prefix = args[0];
  	client.currency.set(message.author.id, shop);

  	message.channel.send(`Prefix Updated to ${args[0]}`);
}

module.exports.help = {
	name: "prefix"
}