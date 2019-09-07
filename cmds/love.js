const Discord = module.require("discord.js");

module.exports.run = async (client, message, args) => {
  	//Tell someone you love them
	var guildSettings;
	if(message.channel.type == "text") guildSettings = client.settings.get(message.guild.id);
  	else guildSettings = client.defaultSettings;

	var user = message.mentions.users.first();
	if(message.channel.type != "dm")var mention = message.mentions.members.first();

  	if(!user) return message.channel.send(`Usage: ${guildSettings.prefix}love @user`)

  	if(message.author === user) return message.channel.send("We all love ourselves.");

  	if(client.user.id === user.id) return message.channel.send("I know, I love meself to! :smirk:");

  	message.channel.send(`${message.member.displayName} loves you ${mention.displayName}`);

}

module.exports.help = {
	name: "love"
}