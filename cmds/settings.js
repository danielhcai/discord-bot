const Discord = module.require("discord.js");

module.exports.run = async (client, message, args) => {

  	var guildSettings;
  	if(message.channel.type == "dm") return message.channel.send("There are no settings on a DM Channel");
	if(message.channel.type == "text") guildSettings = client.settings.get(message.guild.id);
  	else guildSettings = client.defaultSettings;

  	message.channel.send(`Prefix: ${guildSettings.prefix}`);
}

module.exports.help = {
	name: "settings"
}