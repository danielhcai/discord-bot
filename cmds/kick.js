const Discord = module.require("discord.js");

module.exports.run = async (client, message, args) => {
	// Kicks a user if they have permission
  	if(message.channel.type == "dm") return;
  	
	let mentionMember = message.mentions.members.first();
    let author = message.member;

	if(!mentionMember) {
        return message.channel.send("Usage: -kick @user");
    }

	if(!author.hasPermission("KICK_MEMBERS")) {
        return message.channel.send("You do not have permission to kick.");
    }

	if(mentionMember.user.id === message.guild.ownerID || author.roles.highest.comparePositionTo(mentionMember.roles.highest) > 0) {
        return message.channel.send(`You do not have permission to kick ${mentionMember.displayName}.`);
    }

	if(!mentionMember.kickable) {
        return message.channel.send(`I do not have permission to kick ${mentionMember.displayName}.`);
    }
	
    message.channel.send(`You have kicked ${mentionMember.displayName}`);
	mentionMember.kick();

}

module.exports.help = {
	name: "kick"
}