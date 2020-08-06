const Discord = module.require("discord.js");

module.exports.run = async (client, message, args) => {
	// Mutes a user if they have permission

  	if(message.channel.type == "dm") return;
  	
	let mentionMember = message.mentions.members.first();
    let author = message.member;

	if(!mentionMember) {
        return message.channel.send("Usage: -mute @user");
    }

	if(!author.hasPermission("MUTE_MEMBERS")) {
        return message.channel.send("You do not have permission to mute.");
    }

	if(mentionMember.user.id === message.guild.ownerID || author.roles.highest.comparePositionTo(mentionMember.roles.highest) > 0) {
        return message.channel.send(`You do not have permission to mute ${mentionMember.displayName}.`);
    }

	if(!mentionMember.manageable) {
        return message.channel.send(`I do not have permission to mute ${mentionMember.displayName}.`);
    }
	
    message.channel.send(`You have muted ${mentionMember.displayName}`);
	mentionMember.setMute(true);
}

module.exports.help = {
	name: "mute"
}
