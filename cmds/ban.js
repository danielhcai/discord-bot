const Discord = module.require("discord.js");

module.exports.run = async (client, message, args) => {
	// Bans a user if they have permission
  	if(message.channel.type == "dm") return;
  	
	let mentionMember = message.mentions.members.first();
    let author = message.member;

	if(!mentionMember) {
        return message.channel.send("Usage: -ban @user");
    }

	if(!author.hasPermission("BAN_MEMBERS")) {
        return message.channel.send("You do not have permission to ban.");
    }

	if(mentionMember.user.id === message.guild.ownerID || author.roles.highest.comparePositionTo(mentionMember.roles.highest) > 0) {
        return message.channel.send(`You do not have permission to ban ${mentionMember.displayName}.`);
    }

	if(!mentionMember.bannable) {
        return message.channel.send(`I do not have permission to ban ${mentionMember.displayName}.`);
    }
	
    message.channel.send(`You have banned ${mentionMember.displayName}`);
	mentionMember.ban();
}

module.exports.help = {
	name: "ban"
}