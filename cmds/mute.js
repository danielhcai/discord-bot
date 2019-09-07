const Discord = module.require("discord.js");

module.exports.run = async (client, message, args) => {
	// Mutes a user if they have permission
	var guildSettings;
	if(message.channel.type == "text") guildSettings = client.settings.get(message.guild.id);
  	else guildSettings = client.defaultSettings;

  	if(message.channel.type == "dm") return;
  	
	var mentionMember = message.mentions.members.first();
	
	if(!mentionMember) return message.channel.send(`Usage: ${guildSettings.prefix}mute @user`);

	if(!message.member.permissions.has("MUTE_MEMBERS", true)) return message.channel.send("You do not have permission to mute.");

	if(message.member.highestRole.calculatedPosition < mentionMember.highestRole.calculatedPosition) return message.channel.send(`You do not have permission to kick ${mentionMember.displayName}.`);

	if(!mentionMember.kickable) return message.channel.send(`I do not have permission to mute ${mentionMember.displayName}.`);

	message.channel.send(`You have muted ${mentionMember.displayName}`)
	mentionMember.setMute(true);


}

module.exports.help = {
	name: "mute"
}