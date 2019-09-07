const Discord = module.require("discord.js");

module.exports.run = async (client, message, args) => {
	// Bans a user if they have permission
	var guildSettings;
	if(message.channel.type == "text") guildSettings = client.settings.get(message.guild.id);
  	else guildSettings = client.defaultSettings;

  	if(message.channel.type == "dm") return;

	var mentionMember = message.mentions.members.first();

	if(!mentionMember) return message.channel.send(`Usage: ${guildSettings.prefix}ban @user`);

	if(!message.member.permissions.has("BAN_MEMBERS", true)) return message.channel.send("You do not have permission to ban.");

	if(message.member.highestRole.calculatedPosition < mentionMember.highestRole.calculatedPosition) return message.channel.send(`You do not have permission to ban ${mentionMember.displayName}.`);

	if(!mentionMember.bannable) return message.channel.send(`I do not have permission to ban ${mentionMember.displayName}.`);

	message.channel.send(`You have banned ${mentionMember.displayName}`)
	mentionMember.ban();


}

module.exports.help = {
	name: "ban"
}