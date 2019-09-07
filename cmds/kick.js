const Discord = module.require("discord.js");

module.exports.run = async (client, message, args) => {
	// Bans a user if they have permission
	var guildSettings;
	if(message.channel.type == "text") guildSettings = client.settings.get(message.guild.id);
  	else guildSettings = client.defaultSettings;

  	if(message.channel.type == "dm") return;
  	
	var mentionMember = message.mentions.members.first();
	
	if(!mentionMember) return message.channel.send(`Usage: ${guildSettings.prefix}kick @user`);

	if(!message.member.permissions.has("KICK_MEMBERS", true)) return message.channel.send("You do not have permission to kick.");

	if(message.member.highestRole.calculatedPosition < mentionMember.highestRole.calculatedPosition) return message.channel.send(`You do not have permission to kick ${mentionMember.displayName}.`);

	if(!mentionMember.kickable) return message.channel.send(`I do not have permission to kick ${mentionMember.displayName}.`);

	message.channel.send(`You have kicked ${mentionMember.displayName}`)
	mentionMember.kick();

}

module.exports.help = {
	name: "kick"
}