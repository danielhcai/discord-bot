const Discord = module.require("discord.js");

module.exports.run = async (client, message, args) => {
	// Sends link with commands and code
	let embed = new Discord.RichEmbed()
    		.addField("Help", `
    			\n\t\t-avatar
    			\n\t\t-ban
    			\n\t\t-define
    			\n\t\t-help
    			\n\t\t-invite
    			\n\t\t-kick
    			\n\t\t-kiss
    			\n\t\t-love 
    			\n\t\t-mute
    			\n\t\t-nytimes
    			\n\t\t-picture
    			\n\t\t-ping
    			\n\t\t-prefix
    			\n\t\t-profile
    			\n\t\t-say
    			\n\t\t-settings
    			\n\t\t-slap
    			\n\t\t-slots
    			\n\t\t-trivia
    			\n\t\t-unban
    			\n\t\t-userinfo
    			\n\t\t-wiki
    		`)
    		.setColor("#50e080");

    	return message.author.send(embed);
}

module.exports.help = {
	name: "help"
}